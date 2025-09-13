import { prisma } from "../config/db";
import { CreateUserDto, UpdateUserDto, User } from "../types/User";


export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }
    async create(data: CreateUserDto): Promise<User> {
        const user = await prisma.user.create({
            data,
        });
        return user;
    }

    async update(id: number, data: UpdateUserDto): Promise<User | null> {
        const user = await prisma.user.update({
            where: { id },
            data,
        });
        return user;
    }

    async delete(id: number): Promise<User | null> {
        const user = await prisma.user.delete({
            where: { id },
        });
        return user;
    }

    async findById(id: number): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return user;
    }

    async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users;
    }
}