
import { prisma } from "../config/db";
import { CreateTacheDto, Tache, UpdateTacheDto } from "../types/Tache";
import { IRepository } from "./IRepository";

export class TacheRepository implements IRepository{

    async create(data: CreateTacheDto): Promise<Tache> {
    return await prisma.tache.create({ data });
  }

   async findAll(): Promise<Tache[]> {
        return await prisma.tache.findMany();
    }

   async findById(id: number): Promise<Tache | null> {
        return await prisma.tache.findUnique({where:{id}})
    }

   async update(id: number, data: UpdateTacheDto): Promise<Tache> {
        return await prisma.tache.update({where:{id},data})
    }

   async delete(id: number): Promise<boolean> {
       try {
         const deleted = await prisma.tache.delete({where:{id}});
         return !!deleted;
       } catch (error) {
        
      throw error; 
       }
    }
    
}