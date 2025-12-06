"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const vehicle_service_1 = require("./vehicle.service");
const createVehicle = async (req, res) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
    try {
        const result = await vehicle_service_1.vehicleServices.createVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status);
        res.status(200).send({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(501).send({
            success: false,
            message: error.message
        });
    }
};
const getAllVehicles = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleServices.getAllVehicles();
        if (result.rows.length === 0) {
            res.status(200).send({
                success: true,
                message: "No vehicles found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(501).send({
            success: false,
            message: error.message
        });
    }
};
const singleVehicle = async (req, res) => {
    try {
        const id = Number(req.params.vehicleId);
        const result = await vehicle_service_1.vehicleServices.singleVehicle(id);
        res.status(200).send({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(501).send({
            success: false,
            message: error.message
        });
    }
};
const updateVehicle = async (req, res) => {
    try {
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
        const id = Number(req.params.vehicleId);
        const {} = req.body;
        const result = await vehicle_service_1.vehicleServices.updateVehicle(id, vehicle_name, type, registration_number, daily_rent_price, availability_status);
        res.status(200).send({
            success: true,
            message: "Vehicles updated successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(501).send({
            success: false,
            message: error.message
        });
    }
};
const deleteVehicle = async (req, res) => {
    try {
        const id = Number(req.params.vehicleId);
        const result = await vehicle_service_1.vehicleServices.deleteVehicle(id);
        res.status(200).send({
            success: true,
            message: "Vehicles delete successfully",
        });
    }
    catch (error) {
        res.status(501).send({
            success: false,
            message: error.message
        });
    }
};
exports.vehicleController = {
    createVehicle, getAllVehicles, singleVehicle, updateVehicle, deleteVehicle
};
