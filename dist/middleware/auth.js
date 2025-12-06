"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = () => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(500).json({ message: "no access token" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
            req.user = decoded;
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
        next();
    };
};
exports.default = auth;
