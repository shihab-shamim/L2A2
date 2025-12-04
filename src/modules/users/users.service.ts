import { pool } from "../../config/db"


const  createUser = async(name:string,email:string,hashingPassword:string,phone:string,role:string)=>{
    const result =await pool.query(
                 `INSERT INTO users(name, email,password,phone,role) VALUES($1, $2,$3,$4,$5) RETURNING *`,[name,email,hashingPassword,phone,role]
            )
            return result
}

export const userServices={
    createUser
}