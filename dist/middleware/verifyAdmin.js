"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const verifyAdmin = () => {
    return async (req, res, next) => {
        try {
            const user = await req.user;
            if (user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Access denied! Admin only route",
                });
            }
            const result = await db_1.pool.query(`SELECT * FROM users WHERE email=$1`, [user.email]);
            if (result.rowCount === 0) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied! User not found",
                });
            }
            if (result.rows[0].role !== user.role) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied! User not found",
                });
            }
            next();
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: error.message || "Unauthorized access",
            });
        }
    };
};
exports.default = verifyAdmin;
