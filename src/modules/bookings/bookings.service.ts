import { pool } from "../../config/db"


const createBooking=async(customer_id:number, vehicle_id:number, rent_start_date:string, rent_end_date:string)=>{

   const result = await pool.query(
  `
    WITH vehicle_info AS (
        SELECT 
            id AS vehicle_id, 
            vehicle_name, 
            daily_rent_price
        FROM vehicles
        WHERE id = $2
    ),
    days_calculated AS (
        SELECT 
            (DATE($4) - DATE($3)) AS days
    ),
    insert_booking AS (
        INSERT INTO bookings (
            customer_id,
            vehicle_id,
            rent_start_date,
            rent_end_date,
            total_price,
            status
        )
        SELECT
            $1,                     -- customer_id
            v.vehicle_id,           -- vehicle_id
            $3,                     -- rent_start_date
            $4,                     -- rent_end_date
            d.days * v.daily_rent_price AS total_price,
            'active'                -- status
        FROM vehicle_info v
        CROSS JOIN days_calculated d
        RETURNING *
    )
    SELECT 
        b.*, 
        v.vehicle_name,
        v.daily_rent_price
    FROM insert_booking b
    JOIN vehicle_info v 
        ON v.vehicle_id = b.vehicle_id;
  `,
  [customer_id, vehicle_id, rent_start_date, rent_end_date]
);

await pool.query(
  `UPDATE vehicles 
   SET availability_status = 'booked'
   WHERE id = $1`,
  [vehicle_id]
);
    return result;
}


const getBooking=async()=>{
    const result =await pool.query(`
        SELECT * FROM bookings
        `)

        return result

}


export const bookingServices={
    createBooking,getBooking
}