import config from "../config";
import { Pool } from "pg";

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

  await pool.query(`
CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  vehicle_name VARCHAR(200) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
  registration_number VARCHAR(20) NOT NULL UNIQUE,
  daily_rent_price INT NOT NULL CHECK (daily_rent_price > 0),
  availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available', 'booked'))
);
  `);
};

export default initDB; 
