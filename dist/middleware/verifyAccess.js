"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const verifyAccess = () => {
    return async (req, res, next) => {
        try {
            const user = req.user;
            const result = await db_1.pool.query(`SELECT * FROM users WHERE id=$1`, [user.id]);
            if (result.rowCount === 0) {
                return res.status(403).json({
                    success: false,
                    message: "User not found",
                });
            }
            if (user.id !== result.rows[0].id) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied!",
                });
            }
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: error.message || "Unauthorized access",
            });
        }
        next();
    };
};
exports.default = verifyAccess;
