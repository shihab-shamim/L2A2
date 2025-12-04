import { vehicleServices } from './vehicle.service';
import { Request, Response } from "express";

const createVehicle=async(req: Request, res: Response)=>{
    const {vehicle_name, type,registration_number,daily_rent_price,availability_status}=req.body ; 


    try {

    
        const result = await vehicleServices.createVehicle(vehicle_name, type,registration_number,daily_rent_price,availability_status)
        delete result.rows[0].password
        res.status(200).send({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
        
    } catch (error:any) {
        res.status(501).send({
            success:false,
            message:error.message
        })
        
    }
  

  

}

export const vehicleController={
    createVehicle,
}