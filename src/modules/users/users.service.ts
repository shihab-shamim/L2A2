import { pool } from "../../config/db"

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const  createUser = async(name:string,email:string,hashingPassword:string,phone:string,role:string)=>{
    const result =await pool.query(
                 `INSERT INTO users(name, email,password,phone,role) VALUES($1, $2,$3,$4,$5) RETURNING *`,[name,email,hashingPassword,phone,role]
            )
            return result
}

const getAllUser = async ()=>{
    const result =await pool.query(`
        SELECT id, name, email, phone, role FROM users
        `)
        return result
}

const signInUser =async(email:string,password:string)=>{

    
     const result =await pool.query(
                 ` SELECT id, name, email, phone, role,password FROM users WHERE email=$1`,[email]
            )
              const matched =await bcrypt.compare(password,result.rows[0].password)
           
        
            
            if(matched) {
                const  token= await jwt.sign(result.rows[0],"ad8f6e20d5f24919b3c9a177ce4acb1a34d8e930bb3110c39588a9efb21e6e72",{expiresIn:"7d"})
                return {token,data:result}
            }
            else throw Error("password not match")

}

export const userServices={
    createUser,getAllUser,signInUser
}