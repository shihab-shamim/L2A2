"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_service_1 = require("./users.service");
const createUser = async (req, res) => {
    const { name, email, password, phone, role } = req.body;
    const hashingPassword = bcryptjs_1.default.hashSync(password, 10);
    try {
        const result = await users_service_1.userServices.createUser(name, email, hashingPassword, phone, role);
        delete result.rows[0].password;
        res.status(200).send({
            success: true,
            message: "User registered successfully",
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
const getAllUser = async (req, res) => {
    try {
        const result = await users_service_1.userServices.getAllUser();
        res.status(200).send({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        });
    }
    catch (error) {
        res.status(501).send({
            success: false,
            message: error.message
        });
    }
};
const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await users_service_1.userServices.signInUser(email, password);
        delete result.data.rows[0].password;
        res.status(200).send({
            success: true,
            message: "Login successful",
            data: {
                token: result.token,
                user: result.data.rows[0]
            },
        });
    }
    catch (error) {
        res.status(501).send({
            success: false,
            message: error.message
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const { name, email, phone, role } = req.body;
        const id = req.params.userId;
        const result = await users_service_1.userServices.updatedUser(name, email, phone, role, id);
        delete result.rows[0].password;
        res.status(200).send({
            success: true,
            message: "User updated successfully",
            data: {
                data: result.rows[0]
            },
        });
    }
    catch (error) {
        res.status(501).send({
            success: false,
            message: error.message
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const id = req.params.userId;
        const result = await users_service_1.userServices.deleteUser(id);
        if (result.rowCount > 0) {
            res.status(200).send({
                success: true,
                message: "User delete successfully",
            });
        }
    }
    catch (error) {
        res.status(501).send({
            success: false,
            message: error.message
        });
    }
};
exports.userController = {
    createUser, getAllUser, signInUser, updateUser, deleteUser
};
