import { UserRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SuccessCode } from "../utils/successCode";
import { ErrorCode } from "../utils/errorCode";
import { ErrorMessages } from "../utils/errorMessages";
import { SuccessMessages } from "../utils/successMessages";
import { CreateUserDto } from "../types/User";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export class AuthController {
    private userRepo = new UserRepository();

    async register(req: Request, res: Response) {
        try {
            const { email, password, name } = req.body;
            if (!email || !password) {
                return res.status(ErrorCode.BAD_REQUEST).json({ error: ErrorMessages.BAD_REQUEST });
            }
            const existing = await this.userRepo.findByEmail(email);
            if (existing) {
                return res.status(ErrorCode.BAD_REQUEST).json({ error: ErrorMessages.EMAIL_ALREADY_USED });
            }
            const hashed = await bcrypt.hash(password, 10);
            const user: CreateUserDto = { email, password: hashed, name };
            const created = await this.userRepo.create(user);
            res.status(SuccessCode.CREATED).json({ message: SuccessMessages.USER_CREATED, user: created });
        } catch (err) {
            res.status(ErrorCode.INTERNAL_SERVER_ERROR).json({ error: ErrorMessages.INTERNAL_ERROR });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(ErrorCode.BAD_REQUEST).json({ error: ErrorMessages.BAD_REQUEST });
            }
            const user = await this.userRepo.findByEmail(email);
            if (!user) {
                return res.status(ErrorCode.NOT_FOUND).json({ error: ErrorMessages.USER_NOT_FOUND });
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return res.status(ErrorCode.BAD_REQUEST).json({ error: ErrorMessages.INVALID_PASSWORD });
            }
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
            res.status(SuccessCode.OK).json({ token });
        } catch (err) {
            res.status(ErrorCode.INTERNAL_SERVER_ERROR).json({ error: ErrorMessages.INTERNAL_ERROR });
        }
    }
}
