import  config  from "../config"
import {Pool} from 'pg'

export const pool = new Pool({
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

export default initDB