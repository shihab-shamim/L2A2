import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt,{ JwtPayload } from "jsonwebtoken";

const auth=()=>{


    return async(req: Request, res: Response, next: NextFunction)=>{
      
       try {
       const token= req.headers.authorization?.split(" ")[1]

          if (!token) {
        return res.status(500).json({ message: "You are not allowed!!" });
      }
         const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;
      
      req.user = decoded;
        
       }catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }

        next()

    }

}

export default auth;