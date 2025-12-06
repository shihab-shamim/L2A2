"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const bookings_service_1 = require("./bookings.service");
// const createBooking=async(req:Request,res:Response)=>{
//      try {
//    const {customer_id, vehicle_id, rent_start_date, rent_end_date}=req.body
//            const result = await bookingServices.createBooking(Number(customer_id), Number(vehicle_id), rent_start_date, rent_end_date)
//            delete result.rows[0].password
//            res.status(200).send({
//          success: true,
//          message: "User registered successfully",
//          data: result.rows[0],
//        });
//        } catch (error:any) {
//         res.status(501).send({
//             success:false,
//             message:error.message
//         })
//     }
// }
const createBooking = async (req, res) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;
    try {
        const result = await bookings_service_1.bookingServices.createBooking(Number(customer_id), Number(vehicle_id), rent_start_date, rent_end_date);
        const booking = result.rows[0];
        res.status(200).send({
            success: true,
            message: "Booking registered successfully",
            data: {
                id: booking.id,
                customer_id: booking.customer_id,
                vehicle_id: booking.vehicle_id,
                rent_start_date: booking.rent_start_date,
                rent_end_date: booking.rent_end_date,
                total_price: booking.total_price,
                status: booking.status,
                vehicle: {
                    vehicle_name: booking.vehicle_name,
                    daily_rent_price: booking.daily_rent_price
                }
            }
        });
    }
    catch (error) {
        res.status(501).send({
            success: false,
            message: error.message
        });
    }
};
const getBooking = async (req, res) => {
    try {
        const result = await bookings_service_1.bookingServices.getBooking();
        if (req.user.role === "admin") {
            res.status(200).send({
                success: true,
                message: "Bookings retrieved successfully",
                data: result.rows
            });
        }
        res.status(200).send({
            success: true,
            message: "Bookings retrieved successfully",
            data: result.rows.filter((data, index) => data.customer_id === req.user.id)
        });
    }
    catch (error) {
        res.status(501).send({
            success: false,
            message: error.message
        });
    }
};
const updateBooking = async (req, res) => {
    try {
        const bookingId = Number(req.params.bookingId);
        const { status } = req.body;
        const user = req.user;
        const userId = user.id;
        const userRole = user.role;
        if (!status) {
            return res.status(400).send({
                success: false,
                message: "Status is required!"
            });
        }
        const result = await bookings_service_1.bookingServices.updateBooking(bookingId, status, userId, userRole);
        if (result.error) {
            return res.status(403).json({
                success: false,
                message: result.message
            });
        }
        return res.status(200).json({
            success: true,
            message: result.message,
            data: result.data || null,
            vehicle: {
                availability_status: result.data.status
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Request failed!"
        });
    }
};
exports.bookingController = {
    createBooking, getBooking, updateBooking
};
