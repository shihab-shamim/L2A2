"use strict";
// import { userController } from "./user.controller"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const users_controller_1 = require("./users.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const verifyAdmin_1 = __importDefault(require("../../middleware/verifyAdmin"));
const verifyAccess_1 = __importDefault(require("../../middleware/verifyAccess"));
const router = (0, express_1.Router)();
router.post("/auth/signup", users_controller_1.userController.createUser);
router.post("/auth/signin", users_controller_1.userController.signInUser);
router.get("/users", (0, auth_1.default)(), (0, verifyAdmin_1.default)(), users_controller_1.userController.getAllUser);
router.put("/users/:userId", (0, auth_1.default)(), (0, verifyAccess_1.default)(), users_controller_1.userController.updateUser);
router.delete("/users/:userId", (0, auth_1.default)(), (0, verifyAdmin_1.default)(), users_controller_1.userController.deleteUser);
exports.userRoute = router;
