"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const db_1 = require("../../config/db");
const createBooking = async (customer_id, vehicle_id, rent_start_date, rent_end_date) => {
    const result = await db_1.pool.query(`
    WITH vehicle_info AS (
        SELECT 
            id AS vehicle_id, 
            vehicle_name, 
            daily_rent_price
        FROM vehicles
        WHERE id = $2
    ),
    days_calculated AS (
        SELECT 
            (DATE($4) - DATE($3)) AS days
    ),
    insert_booking AS (
        INSERT INTO bookings (
            customer_id,
            vehicle_id,
            rent_start_date,
            rent_end_date,
            total_price,
            status
        )
        SELECT
            $1,                     -- customer_id
            v.vehicle_id,           -- vehicle_id
            $3,                     -- rent_start_date
            $4,                     -- rent_end_date
            d.days * v.daily_rent_price AS total_price,
            'active'                -- status
        FROM vehicle_info v
        CROSS JOIN days_calculated d
        RETURNING *
    )
    SELECT 
        b.*, 
        v.vehicle_name,
        v.daily_rent_price
    FROM insert_booking b
    JOIN vehicle_info v 
        ON v.vehicle_id = b.vehicle_id;
  `, [customer_id, vehicle_id, rent_start_date, rent_end_date]);
    await db_1.pool.query(`UPDATE vehicles 
   SET availability_status = 'booked'
   WHERE id = $1`, [vehicle_id]);
    return result;
};
const getBooking = async () => {
    const result = await db_1.pool.query(`
        SELECT * FROM bookings
        `);
    return result;
};
const updateBooking = async (bookingId, status, userId, userRole) => {
    const bookingResult = await db_1.pool.query(`SELECT * FROM bookings WHERE id = $1`, [bookingId]);
    if (bookingResult.rowCount === 0) {
        return { error: true, message: "Booking not found!" };
    }
    const booking = bookingResult.rows[0];
    if (userRole === "customer") {
        if (booking.customer_id !== userId) {
            return { error: true, message: "You cannot modify this booking!" };
        }
        if (status !== "cancelled") {
            return { error: true, message: "Already booking canceled" };
        }
        if (booking.status !== "active") {
            return { error: true, message: "Only active bookings can be cancelled!" };
        }
        const updateResult = await db_1.pool.query(`UPDATE bookings 
       SET status = 'cancelled'
       WHERE id = $1
       RETURNING *`, [bookingId]);
        return {
            success: true,
            message: "Booking cancelled successfully",
            data: updateResult.rows[0],
        };
    }
    if (userRole === "admin") {
        if (status !== "returned") {
            return { error: true, message: "Admins can only mark as returned!" };
        }
        if (booking.status !== "active") {
            return { error: true, message: "Only active bookings can be returned!" };
        }
        const updateBookingResult = await db_1.pool.query(`UPDATE bookings 
       SET status = 'returned'
       WHERE id = $1
       RETURNING *`, [bookingId]);
        await db_1.pool.query(`UPDATE vehicles 
       SET availability_status = 'available'
       WHERE id = $1`, [booking.vehicle_id]);
        return {
            success: true,
            message: "Booking marked as returned. Vehicle is now available",
            data: updateBookingResult.rows[0],
            vehicle: { availability_status: "available" },
        };
    }
    return { error: true, message: "Unauthorized role!" };
};
exports.bookingServices = {
    createBooking, getBooking, updateBooking
};
