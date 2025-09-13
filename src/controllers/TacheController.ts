import { TacheRepository } from '../repositories/TacheRepository';
import { TacheService } from '../services/TacheService';
import { HistoriqueService } from '../services/HistoriqueService';
import { HistoriqueRepository } from '../repositories/HistoriqueRepository';
import { Request, Response } from 'express';
import { SuccessMessages } from '../utils/successMessages';
import { ErrorMessages } from '../utils/errorMessages';
import { SuccessCode } from '../utils/successCode';
import { validateTache } from '../validators/validator';
import { CreateTacheDto } from '../types/Tache';
import { ErrorCode } from '../utils/errorCode';

export class TacheController {
  private tacheRepository: TacheRepository;
    private historiqueService: HistoriqueService;
    private tacheService: TacheService;

  constructor() {
  this.tacheRepository = new TacheRepository();
  this.historiqueService = new HistoriqueService(new HistoriqueRepository());
  this.tacheService = new TacheService(this.tacheRepository, this.historiqueService);
  }

  async create(req: Request, res: Response) {
    try {
      const result = validateTache(req.body);
      if (!result.success) {
        return res.status(ErrorCode.BAD_REQUEST).json({
          error: result.error.issues.map((e: any) => e.message).join(', '),
        });
      }

      const data = { ...result.data };
      if (data.description === null || data.description === undefined) {
        delete data.description;
      }
      // Injecter le userId depuis le token
      if (req.user && req.user.id) {
        (data as any).userId = req.user.id;
      }
        const tache = await this.tacheService.createTache(data as CreateTacheDto);
      res.status(SuccessCode.CREATED).json({
        tache,
        message: SuccessMessages.TACHE_CREATED,
      });
    } catch (error: any) {
      res
        .status(ErrorCode.BAD_REQUEST)
        .json({ error: error.message || ErrorMessages.BAD_REQUEST });
    }
  }

  async getTaches(req: Request, res: Response): Promise<void> {
    const taches = await this.tacheService.getTaches();
    res.status(SuccessCode.OK).json(taches);
  }

  async getTache(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const tache = await this.tacheService.getTache(Number(id), userId);
    if (tache) {
      res.status(SuccessCode.OK).json(tache);
    } else {
      res
        .status(ErrorCode.NOT_FOUND)
        .json({ error: ErrorMessages.TACHE_NOT_FOUND });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    try {
      const updated = await this.tacheService.updateTache(Number(id), req.body, userId);
      res.status(SuccessCode.OK).json({
        updated,
        message: SuccessMessages.TACHE_UPDATED,
      });
    } catch (error: any) {
      res.status(ErrorCode.BAD_REQUEST).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    try {
      const deleted = await this.tacheService.deleteTache(Number(id), userId);
      if (deleted) {
        res.status(SuccessCode.NO_CONTENT).json({ message: SuccessMessages.TACHE_DELETED });
      } else {
        res.status(ErrorCode.NOT_FOUND).json({ error: ErrorMessages.TACHE_NOT_FOUND });
      }
    } catch (error: any) {
      res.status(ErrorCode.BAD_REQUEST).json({ error: error.message });
    }
  }
}
