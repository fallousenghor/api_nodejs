"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getEnv(key, defaultValue) {
    var _a;
    const value = (_a = process.env[key]) !== null && _a !== void 0 ? _a : defaultValue;
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}
exports.ENV = {
    //   NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: parseInt(getEnv("PORT", "3002"), 10),
    DATABASE_URL: getEnv("DATABASE_URL"),
    //   JWT_SECRET: getEnv("JWT_SECRET"),
};
