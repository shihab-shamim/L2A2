"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const db_1 = __importDefault(require("./config/db"));
const users_routes_1 = require("./modules/users/users.routes");
const vehicle_route_1 = require("./modules/vehicles/vehicle.route");
const bookings_routes_1 = require("./modules/bookings/bookings.routes");
const app = (0, express_1.default)();
const port = config_1.default.PORT;
(0, db_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", users_routes_1.userRoute);
app.use("/api/v1", vehicle_route_1.vehicleRoute);
app.use("/api/v1", bookings_routes_1.bookingRoute);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
