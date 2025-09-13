import { UpdateUserDto } from './../types/User';
import { IUserRepository } from "../repositories/IRepository";
import { CreateUserDto } from "../types/User";

export class UserService {

    constructor(private iuserRepo: IUserRepository){}

    async findUserByEmail(email: string) {
        return this.iuserRepo.findByEmail(email);
    }

    async createUser(data: CreateUserDto) {
        return this.iuserRepo.create(data);
    }

    async updateUser(id: number, data: UpdateUserDto) {
        return this.iuserRepo.update(id,data );
    }

    async deleteUser(id: number) {
        return this.iuserRepo.delete(id);
    }

    async getUser(id: number) {
        return this.iuserRepo.findById(id);
    }

    async getUsers() {
        return this.iuserRepo.findAll();
    }
}