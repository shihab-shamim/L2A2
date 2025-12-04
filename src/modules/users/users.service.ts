import { pool } from "../../config/db"

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

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
           
        delete result.rows[0].password
            
            if(matched) {
                const  token= await jwt.sign(result.rows[0],config.jwtSecret as string,{expiresIn:"7d"})
                return {token,data:result}
            }
            else throw Error("password not match")

}

const updatedUser=async(name:string,email:string,phone:string,role:string,id:string)=>{
       const result =await pool.query(
                 ` UPDATE users SET name=$1, email=$2 , phone=$3,role=$4 WHERE id=$5 RETURNING *`,[name,email,phone,role,id]
            )
            return result

}

const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

  return result;
};
    

export const userServices={
    createUser,getAllUser,signInUser,updatedUser,deleteUser
}