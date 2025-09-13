
import { Router } from "express";
import { HistoriqueController } from "../controllers/HistoriqueController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();
const historiqueController = new HistoriqueController();

router.get("/", authenticate, historiqueController.getHistoriques.bind(historiqueController));
router.get("/:id", authenticate, historiqueController.getHistorique.bind(historiqueController));
router.get("/tache/:tacheId", authenticate, historiqueController.getHistoriqueByTacheId.bind(historiqueController));
router.post("/", authenticate, historiqueController.createHistorique.bind(historiqueController));
router.put("/:id", authenticate, historiqueController.updateHistorique.bind(historiqueController));
router.delete("/:id", authenticate, historiqueController.deleteHistorique.bind(historiqueController));

export default router;