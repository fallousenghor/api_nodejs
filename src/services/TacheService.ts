
import { UserRepository } from '../repositories/UserRepository';
import { CreateTacheDto, Tache ,UpdateTacheDto } from '../types/Tache';
import { ErrorMessages } from '../utils/errorMessages';
import { IRepository } from './../repositories/IRepository';
import { HistoriqueService } from './HistoriqueService';
import { TacheAccessService } from './TacheAccessService';

export class TacheService {
  private tacheAccessService: TacheAccessService;
  private tacherepo: IRepository;
  private historiqueService: HistoriqueService;

  constructor(tacherepo: IRepository, historiqueService: HistoriqueService) {
    this.tacherepo = tacherepo;
    this.historiqueService = historiqueService;
    this.tacheAccessService = new TacheAccessService();
  }

   async createTache(data: CreateTacheDto):Promise<Tache>{
     const tache = await this.tacherepo.create(data);
     await this.historiqueService.createHistorique({
       action: "create",
       userId: data.userId,
       tacheId: tache.id
     });
     return tache;
   }

   async getTaches():Promise<Tache[]>{
    return this.tacherepo.findAll(); 
   }

   async getTache(id:number, userId?: number):Promise<Tache | null>{
    const tache = await this.tacherepo.findById(id);
    if (tache && typeof userId === 'number') {
      await this.historiqueService.createHistorique({
        action: "read",
        userId: userId,
        tacheId: tache.id
      });
    }
    return tache;
   }

   async updateTache(id:number ,data: UpdateTacheDto, userId?: number):Promise<Tache>{
    const tache = await this.tacherepo.findById(id);
    if (!tache) {
      throw new Error(ErrorMessages.TACHE_NOT_FOUND);
    }
    if (typeof userId !== 'number') {
      throw new Error(ErrorMessages.UNAUTHORIZED_UPDATE);
    }
    // Vérification accès : créateur ou invité
    const userEmail = await this.getUserEmail(userId);
    const canEdit = userEmail ? await this.tacheAccessService.userCanEditTache(id, userId, userEmail) : false;
    if (!canEdit) {
      throw new Error(ErrorMessages.UNAUTHORIZED_UPDATE);
    }
    const updatedTache = await this.tacherepo.update(id, data);
    await this.historiqueService.createHistorique({
      action: "update",
      userId: userId,
      tacheId: updatedTache.id
    });
    return updatedTache;
   }
    async deleteTache(id:number, userId?: number):Promise<boolean>{
    const tache = await this.tacherepo.findById(id);
    if (!tache) {
      throw new Error(ErrorMessages.TACHE_NOT_FOUND);
    }
    if (typeof userId !== 'number') {
      throw new Error(ErrorMessages.UNAUTHORIZED_DELETE);
    }
    // Vérification accès : créateur ou invité
    const userEmail = await this.getUserEmail(userId);
    const canEdit = userEmail ? await this.tacheAccessService.userCanEditTache(id, userId, userEmail) : false;
    if (!canEdit) {
      throw new Error(ErrorMessages.UNAUTHORIZED_DELETE);
    }
    const deleted = await this.tacherepo.delete(id);
    if (deleted) {
      await this.historiqueService.createHistorique({
        action: "delete",
        userId: userId,
        tacheId: id
      });
    }
    return deleted;

  }

  // Récupère l'email d'un utilisateur par son id
  private async getUserEmail(userId: number): Promise<string | undefined> {
    const user = await UserRepository.prototype.findById(userId);
    return user?.email;
  }
}

