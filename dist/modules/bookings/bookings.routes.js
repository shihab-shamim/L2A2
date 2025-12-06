"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoute = void 0;
const express_1 = require("express");
const bookings_controller_1 = require("./bookings.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const verifyAccess_1 = __importDefault(require("../../middleware/verifyAccess"));
const router = (0, express_1.Router)();
router.post("/bookings", (0, auth_1.default)(), (0, verifyAccess_1.default)(), bookings_controller_1.bookingController.createBooking);
router.get("/bookings", (0, auth_1.default)(), (0, verifyAccess_1.default)(), bookings_controller_1.bookingController.getBooking);
router.put("/bookings/:bookingId", (0, auth_1.default)(), (0, verifyAccess_1.default)(), bookings_controller_1.bookingController.updateBooking);
exports.bookingRoute = router;
