import { Router } from "express";
import { bookingController } from "./bookings.controller";
import auth from "../../middleware/auth";
import verifyAccess from "../../middleware/verifyAccess";




const router=Router()

router.post("/bookings",auth(),verifyAccess(),bookingController.createBooking)
router.get("/bookings",auth(),verifyAccess(),bookingController.getBooking)
router.put("/bookings/:bookingId",auth(),verifyAccess(),bookingController.updateBooking)


export const bookingRoute=router;
