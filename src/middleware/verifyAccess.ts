import { Params } from './../../node_modules/@types/express-serve-static-core/index.d';
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { pool } from "../config/db";

const verifyAccess=()=>{

    return async(req: Request, res: Response, next: NextFunction)=>{
       
        
        try {
             const user = req.user as JwtPayload;
             
            
  

      const result =await pool.query(`SELECT * FROM users WHERE id=$1`,[user.id])
      if(result.rowCount ===0) {
         return res.status(403).json({
          success: false,
          message: "User not found",
        });
      }

      if(user.id !== result.rows[0].id){
        return res.status(403).json({
          success: false,
          message: "Access denied!",
        });
      }

         
        } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || "Unauthorized access",
      });
    }
        next()


        

    }
}

export default verifyAccess