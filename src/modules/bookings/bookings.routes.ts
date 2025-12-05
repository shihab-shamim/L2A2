import { Router } from "express";
import { bookingController } from "./bookings.controller";
import auth from "../../middleware/auth";
import verifyAccess from "../../middleware/verifyAccess";




const router=Router()

router.post("/bookings",auth(),verifyAccess(),bookingController.createBooking)


export const bookingRoute=router;
