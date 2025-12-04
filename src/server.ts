import express, { Request, Response } from "express";
import { Pool } from "pg";


import config from "./config";
import initDB, { pool } from "./config/db";
import { userRoute } from "./modules/users/users.routes";

const app = express();
const port = config.PORT;




initDB()

app.use(express.json())

app.use("/api/v1",userRoute)

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
// });


// app.post("/api/v1/auth/signup",)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
