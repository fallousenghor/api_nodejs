import { IHistoriqueRepository } from "../repositories/IRepository";
import { CreateHistoriqueDto, Historique, UpdateHistoriqueDto } from "../types/Historique";

export class HistoriqueService {
    constructor(private ihistoriqueRepo: IHistoriqueRepository) {}
    async createHistorique(data: CreateHistoriqueDto):Promise<Historique> {
        return this.ihistoriqueRepo.create(data);
    }
    async getHistoriqueByTacheId(tacheId: number):Promise<Historique[]> {
        return this.ihistoriqueRepo.findByTacheId(tacheId);
    }
    async getAllHistoriques():Promise<Historique[]> {
        return this.ihistoriqueRepo.findAll();
    }
    async getHistoriqueById(id: number):Promise<Historique | null> {
        return this.ihistoriqueRepo.findById(id);
    }
    async updateHistorique(id: number, data: UpdateHistoriqueDto):Promise<Historique | null> {
        return this.ihistoriqueRepo.update(id, data);
    }
    async deleteHistorique(id: number):Promise<boolean> {
        return this.ihistoriqueRepo.delete(id);
    }
}