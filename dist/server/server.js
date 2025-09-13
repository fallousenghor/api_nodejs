"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const env_1 = require("../config/env");
const routes_1 = __importDefault(require("../routes/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", routes_1.default);
const startServer = () => {
    app.listen(env_1.ENV.PORT, () => {
        console.log(`Lerveur ecoute sur le port : http://localhost:${env_1.ENV.PORT}`);
    });
};
exports.startServer = startServer;
exports.default = app;
