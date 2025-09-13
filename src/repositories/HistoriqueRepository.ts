import { prisma } from "../config/db";
import { CreateHistoriqueDto, Historique, UpdateHistoriqueDto } from "../types/Historique";
import { IHistoriqueRepository } from "./IRepository";

export class HistoriqueRepository implements IHistoriqueRepository {
    async create(data:CreateHistoriqueDto):Promise<Historique> {
       return await prisma.historique.create({
            data,
        });
    }
    async findByTacheId(tacheId: number):Promise<Historique[]> {
        return prisma.historique.findMany({ where: { tacheId } });
    }
    async findAll():Promise<Historique[]> {
        return prisma.historique.findMany();
    }
    async findById(id:number):Promise<Historique | null> {
        return prisma.historique.findUnique({ where: { id } });
    }
    async delete(id:number):Promise<boolean> {
        await prisma.historique.delete({ where: { id } });
        return true;
    }
    async update(id:number , data: UpdateHistoriqueDto):Promise<Historique | null> {
        return prisma.historique.update({
            where: { id },
            data,
        });
    }           
}