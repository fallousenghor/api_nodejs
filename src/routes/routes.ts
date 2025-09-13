import { Router } from "express";
import tacheRoute from "./tacheRoute";
import userRoute from "./userRoute";
import authRoute from "./authRoute";
import historiqueRoute from "./historiqueRoute";
import tacheAccessRoute from "./tacheAccessRoute";

const router = Router();

router.use("/taches", tacheRoute);
router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/historiques", historiqueRoute);
router.use("/taches", tacheAccessRoute);

export default router;


