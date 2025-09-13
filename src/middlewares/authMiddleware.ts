import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorCode } from "../utils/errorCode";
import { ErrorMessages } from "../utils/errorMessages";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(ErrorCode.BAD_REQUEST).json({ error: ErrorMessages.BAD_REQUEST });
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
        req.user = payload;
        next();
    } catch {
        return res.status(ErrorCode.BAD_REQUEST).json({ error: ErrorMessages.INVALID_TOKEN });
    }
}
