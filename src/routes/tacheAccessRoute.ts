import { Router } from "express";
import { TacheAccessService } from "../services/TacheAccessService";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();
const tacheAccessService = new TacheAccessService();

router.post("/:id/invite", authenticate, async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email requis" });
  }
  try {
    await tacheAccessService.inviteUserToTache(Number(id), email);
    res.status(200).json({ message: `Invitation envoyée à ${email}` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
