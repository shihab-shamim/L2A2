"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const db_1 = require("../../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const createUser = async (name, email, hashingPassword, phone, role) => {
    const result = await db_1.pool.query(`INSERT INTO users(name, email,password,phone,role) VALUES($1, $2,$3,$4,$5) RETURNING *`, [name, email, hashingPassword, phone, role]);
    return result;
};
const getAllUser = async () => {
    const result = await db_1.pool.query(`
        SELECT id, name, email, phone, role FROM users
        `);
    return result;
};
const signInUser = async (email, password) => {
    const result = await db_1.pool.query(` SELECT id, name, email, phone, role,password FROM users WHERE email=$1`, [email]);
    const matched = await bcryptjs_1.default.compare(password, result.rows[0].password);
    delete result.rows[0].password;
    if (matched) {
        const token = await jsonwebtoken_1.default.sign(result.rows[0], config_1.default.jwtSecret, { expiresIn: "7d" });
        return { token, data: result };
    }
    else
        throw Error("password not match");
};
const updatedUser = async (name, email, phone, role, id) => {
    const result = await db_1.pool.query(` UPDATE users SET name=$1, email=$2 , phone=$3,role=$4 WHERE id=$5 RETURNING *`, [name, email, phone, role, id]);
    return result;
};
const deleteUser = async (id) => {
    const result = await db_1.pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return result;
};
exports.userServices = {
    createUser, getAllUser, signInUser, updatedUser, deleteUser
};
