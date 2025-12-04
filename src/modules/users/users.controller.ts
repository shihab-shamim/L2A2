import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import { userServices } from "./users.service";



const createUser=async(req: Request, res: Response)=>{
    const {name, email,password,phone,role}=req.body ; 

    const hashingPassword = bcrypt.hashSync(password, 10);

    try {

    
        const result = await userServices.createUser(name,email,hashingPassword,phone,role)
        delete result.rows[0].password
        res.status(200).send({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
        
    } catch (error:any) {
        res.status(501).send({
            success:false,
            message:error.message
        })
        
    }
  

  

}

export const userController={
    createUser,
}