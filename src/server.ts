import express, { Request, Response } from "express";
import { Pool } from "pg";


import config from "./config";
import initDB, { pool } from "./config/db";
import { userRoute } from "./modules/users/users.routes";
import { vehicleRoute } from "./modules/vehicles/vehicle.route";
import { bookingRoute } from "./modules/bookings/bookings.routes";

const app = express();
const port = config.PORT;




initDB()

app.use(express.json())

app.use("/api/v1",userRoute)
app.use("/api/v1",vehicleRoute)
app.use("/api/v1",bookingRoute)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
