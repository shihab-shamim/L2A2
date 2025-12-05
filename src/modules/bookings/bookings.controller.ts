import { Request, Response } from 'express';
import { bookingServices } from './bookings.service';


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

const createBooking=async(req: Request, res: Response)=>{
   const {customer_id, vehicle_id, rent_start_date, rent_end_date}=req.body; 

  
    try {

    
        const result = await bookingServices.createBooking(Number(customer_id), Number(vehicle_id), rent_start_date, rent_end_date)
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
        
    } catch (error:any) {
        res.status(501).send({
            success:false,
            message:error.message
        })
        
    }
  

  

}


export const bookingController={
    createBooking
}