import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";
import verifyAdmin from "../../middleware/verifyAdmin";

  const router=Router()

  router.post("/vehicles",auth(),verifyAdmin(),vehicleController.createVehicle)
  router.get("/vehicles",vehicleController.getAllVehicles)



export const vehicleRoute=router;