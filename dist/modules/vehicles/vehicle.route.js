"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRoute = void 0;
const express_1 = require("express");
const vehicle_controller_1 = require("./vehicle.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const verifyAdmin_1 = __importDefault(require("../../middleware/verifyAdmin"));
const router = (0, express_1.Router)();
router.post("/vehicles", (0, auth_1.default)(), (0, verifyAdmin_1.default)(), vehicle_controller_1.vehicleController.createVehicle);
router.get("/vehicles", vehicle_controller_1.vehicleController.getAllVehicles);
router.get("/vehicles/:vehicleId", vehicle_controller_1.vehicleController.singleVehicle);
router.put("/vehicles/:vehicleId", (0, auth_1.default)(), (0, verifyAdmin_1.default)(), vehicle_controller_1.vehicleController.updateVehicle);
router.delete("/vehicles/:vehicleId", (0, auth_1.default)(), (0, verifyAdmin_1.default)(), vehicle_controller_1.vehicleController.deleteVehicle);
exports.vehicleRoute = router;
