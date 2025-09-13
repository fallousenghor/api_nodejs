import { Router } from "express";
import { UserController } from "../controllers/UserController";


const userController = new UserController();
const router = Router();

router.post("/", (req, res) => userController.createUser(req, res));
router.get("/", (req, res) => userController.getUsers(req, res));
router.get("/:id", (req, res) => userController.getUser(req, res));
router.put("/:id", (req, res) => userController.updateUser(req, res));
router.delete("/:id", (req, res) => userController.deleteUser(req, res));

export default router;