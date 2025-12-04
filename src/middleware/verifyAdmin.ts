import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { pool } from "../config/db";

const verifyAdmin=()=>{

    return async(req: Request, res: Response, next: NextFunction)=>{
       
        
        try {
             const user =await req.user as JwtPayload;
             
            if (user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Access denied! Admin only route",
        });
      }

      const result =await pool.query(`SELECT * FROM users WHERE email=$1`,[user.email])
      if(result.rowCount ===0) {
         return res.status(403).json({
          success: false,
          message: "Access denied! User not found",
        });
      }

      if(result.rows[0].role !== user.role){ 
         return res.status(403).json({
          success: false,
          message: "Access denied! User not found",
        });

      }
   
        next()

            
        } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || "Unauthorized access",
      });
    }

        

    }
}

export default verifyAdmin