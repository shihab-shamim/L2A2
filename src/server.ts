import express, { Request, Response } from "express";
import { Pool } from "pg";
import path from "path";
import { config } from "dotenv";
import bcrypt from "bcryptjs";
const app = express();
const port = 5000;
config({ path: path.join(process.cwd(), ".env") });
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
  ssl: { rejectUnauthorized: false },
});

const initDB = async () => {
  await pool.query(`
     CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer'))
);
    `);

  // await pool.query(`
  //   CREATE TABLE IF NOT EXISTS bookings (
  //     id SERIAL PRIMARY KEY,
  //     user_id INT REFERENCES users(id) ON DELETE CASCADE,
  //     title VARCHAR(200) NOT NULL,
  //     description TEXT,
  //     complete BOOLEAN DEFAULT FALSE,
  //     due_date DATE,
  //     created_at TIMESTAMP DEFAULT NOW(),
  //     updated_at TIMESTAMP DEFAULT NOW()
  //   );
  // `);
};
initDB()

app.use(express.json())


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/api/v1/auth/signup",async(req: Request, res: Response)=>{
    const {name, email,password,phone,role}=req.body ; 
    //  const result = await pool.query(
    //   `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
    //   [user_id, title]
    // );
    const hashingPassword = bcrypt.hashSync(password, 10);

    try {

    
        const result =await pool.query(
             `INSERT INTO users(name, email,password,phone,role) VALUES($1, $2,$3,$4,$5) RETURNING *`,[name,email,hashingPassword,phone,role]
        )
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
  

  

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
