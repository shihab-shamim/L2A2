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

const getAllUser =async (req: Request, res: Response)=>{
    try {
         const result = await userServices.getAllUser();
        res.status(200).send({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
        
    } catch (error:any) {
        res.status(501).send({
            success:false,
            message:error.message
        })
        
    }

}

const signInUser= async (req: Request, res: Response)=>{
    try {
        const {email,password} =req.body
          const result = await userServices.signInUser(email,password);
          delete result.data.rows[0].password
          res.status(200).send({
      success: true,
      message: "Login successful",
      
      data: {
        token:result.token,
        user:result.data.rows[0]},
    });
        
    } catch (error:any) {
        res.status(501).send({
            success:false,
            message:error.message
        })
        
    }
}

export const userController={
    createUser,getAllUser,signInUser
}