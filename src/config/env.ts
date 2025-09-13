
import dotenv from "dotenv";
dotenv.config();
function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const ENV = {
//   NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: parseInt(getEnv("PORT", "3002"), 10),
  DATABASE_URL: getEnv("DATABASE_URL"),
//   JWT_SECRET: getEnv("JWT_SECRET"),
};
