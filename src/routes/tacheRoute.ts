
import { Router } from "express";
import { TacheController } from "../controllers/TacheController";
import { authenticate } from "../middlewares/authMiddleware";

const tacheController = new TacheController();
const router = Router();

router.get("/", tacheController.getTaches.bind(tacheController));
router.post("/", authenticate, tacheController.create.bind(tacheController));
router.get("/:id", authenticate, tacheController.getTache.bind(tacheController));
router.put("/:id", authenticate, tacheController.update.bind(tacheController));
router.delete("/:id", authenticate, tacheController.delete.bind(tacheController));

export default router;