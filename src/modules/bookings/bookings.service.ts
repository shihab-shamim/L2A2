import { pool } from "../../config/db"


const createBooking=async(customer_id:number, vehicle_id:number, rent_start_date:string, rent_end_date:string)=>{

   const result = await pool.query(
  `
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
  `,
  [customer_id, vehicle_id, rent_start_date, rent_end_date]
);

await pool.query(
  `UPDATE vehicles 
   SET availability_status = 'booked'
   WHERE id = $1`,
  [vehicle_id]
);
    return result;
}


const getBooking=async()=>{
    const result =await pool.query(`
        SELECT * FROM bookings
        `)

        return result

}

const updateBooking = async (
  bookingId: number,
  status: string,
  userId: number,
  userRole: string
) => {
  // 1️⃣ Check booking exists
  const bookingResult = await pool.query(
    `SELECT * FROM bookings WHERE id = $1`,
    [bookingId]
  );

  if (bookingResult.rowCount === 0) {
    return { error: true, message: "Booking not found!" };
  }

  const booking = bookingResult.rows[0];

  // 2️⃣ CUSTOMER CAN ONLY CANCEL OWN ACTIVE BOOKING
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

    // Update booking
    const updateResult = await pool.query(
      `UPDATE bookings 
       SET status = 'cancelled'
       WHERE id = $1
       RETURNING *`,
      [bookingId]
    );

    return {
      success: true,
      message: "Booking cancelled successfully",
      data: updateResult.rows[0],
    };
  }

  // 3️⃣ ADMIN CAN MARK AS RETURNED ONLY IF ACTIVE
  if (userRole === "admin") {
    if (status !== "returned") {
      return { error: true, message: "Admins can only mark as returned!" };
    }

    if (booking.status !== "active") {
      return { error: true, message: "Only active bookings can be returned!" };
    }

    const updateBookingResult = await pool.query(
      `UPDATE bookings 
       SET status = 'returned'
       WHERE id = $1
       RETURNING *`,
      [bookingId]
    );

    // Vehicle availability update
    await pool.query(
      `UPDATE vehicles 
       SET availability_status = 'available'
       WHERE id = $1`,
      [booking.vehicle_id]
    );

    return {
      success: true,
      message: "Booking marked as returned. Vehicle is now available",
      data: updateBookingResult.rows[0],
      vehicle: { availability_status: "available" },
    };
  }

  return { error: true, message: "Unauthorized role!" };
};


export const bookingServices={
    createBooking,getBooking,updateBooking
}