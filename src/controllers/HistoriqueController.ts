import { Request, Response } from "express";
import { HistoriqueService } from "../services/HistoriqueService";
import { IHistoriqueRepository } from "../repositories/IRepository";
import { HistoriqueRepository } from "../repositories/HistoriqueRepository";
import { CreateHistoriqueDto, UpdateHistoriqueDto } from "../types/Historique";
import { ErrorMessages } from "../utils/errorMessages";
import { SuccessMessages } from "../utils/successMessages";
import { SuccessCode } from "../utils/successCode";
import { ErrorCode } from "../utils/errorCode";




export class HistoriqueController {
    private historiqueRepo: IHistoriqueRepository;
    private historiqueService: HistoriqueService;

    constructor() {
        this.historiqueRepo = new HistoriqueRepository();
        this.historiqueService = new HistoriqueService(this.historiqueRepo);
    }

    async createHistorique(req: Request, res: Response) {
        const historiqueData: CreateHistoriqueDto = req.body;
        await this.historiqueService.createHistorique(historiqueData);
        res.status(SuccessCode.CREATED).json({ message: SuccessMessages.HISTORIQUE_CREATED });
    }

    async getHistoriques(req: Request, res: Response) {
        const historiques = await this.historiqueService.getAllHistoriques();
        res.status(SuccessCode.OK).json(historiques);
    }
    async getHistorique(req: Request, res: Response) {
        const { id } = req.params;
        const historiqueId = Number(id);
        if (!historiqueId) {
            return res.status(ErrorCode.BAD_REQUEST).json({ error: ErrorMessages.BAD_REQUEST });
        }
        const historique = await this.historiqueService.getHistoriqueById(historiqueId);
        if (historique) {
            res.status(SuccessCode.OK).json(historique);
        } else {
            res.status(ErrorCode.NOT_FOUND).json({ error: ErrorMessages.TACHE_NOT_FOUND });
        }
    }
    async getHistoriqueByTacheId(req: Request, res: Response) {
        const { tacheId } = req.params;
        const historiques = await this.historiqueService.getHistoriqueByTacheId(Number(tacheId));
        res.status(SuccessCode.OK).json(historiques);
    }

    async updateHistorique(req: Request, res: Response) {
        const { id } = req.params;
        const historiqueData: UpdateHistoriqueDto = req.body;
        const historique = await this.historiqueService.updateHistorique(Number(id), historiqueData);
        if (historique) {
            res.status(SuccessCode.OK).json(historique);
        } else {
            res.status(ErrorCode.NOT_FOUND).json({ error: ErrorMessages.TACHE_NOT_FOUND });
        }
    }

    async deleteHistorique(req: Request, res: Response) {
        const { id } = req.params;
        const deleted = await this.historiqueService.deleteHistorique(Number(id));
        if (deleted) {
            res.status(SuccessCode.OK).json({ message: SuccessMessages.HISTORIQUE_DELETED });
        } else {
            res.status(ErrorCode.NOT_FOUND).json({ error: ErrorMessages.TACHE_NOT_FOUND });
        }
    }
       }