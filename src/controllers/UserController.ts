import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { CreateUserDto } from "../types/User";
import { ErrorMessages } from "../utils/errorMessages";
import { SuccessMessages } from "../utils/successMessages";
import { SuccessCode } from "../utils/successCode";
import { ErrorCode } from "../utils/errorCode";
import { Request, Response } from "express";

export class UserController {
    private userRepo : UserRepository ;
    private userService : UserService ;
    constructor() {
        this.userRepo = new UserRepository();
        this.userService = new UserService(this.userRepo);
    }

    async createUser(req: Request, res: Response) {
    const userData: CreateUserDto = req.body;
    const user = await this.userService.createUser(userData);
    res.status(SuccessCode.CREATED).json(user);
    }
    async getUsers(req: Request, res: Response) {
    const users = await this.userService.getUsers();
    res.status(SuccessCode.OK).json(users);
    }
    async getUser(req: Request, res: Response) {
        const { id } = req.params;
        const user = await this.userService.getUser(Number(id));
        if (user) {
            res.status(SuccessCode.OK).json(user);
        } else {
            res.status(ErrorCode.NOT_FOUND).json({ error: ErrorMessages.USER_NOT_FOUND });
        }
    }
    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const userData = req.body;
        const user = await this.userService.updateUser(Number(id), userData);
        if (user) {
            res.status(SuccessCode.OK).json(user);
        } else {
            res.status(ErrorCode.NOT_FOUND).json({ error: ErrorMessages.USER_NOT_FOUND });
        }
    }
    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        const user = await this.userService.deleteUser(Number(id));
        if (user) {
            res.status(SuccessCode.OK).json({ message: SuccessMessages.USER_DELETED });
        } else {
            res.status(ErrorCode.NOT_FOUND).json({ error: ErrorMessages.USER_NOT_FOUND });
        }
    }

}