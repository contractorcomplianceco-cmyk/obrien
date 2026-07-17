import { Router, type IRouter } from "express";
import healthRouter from "./health";
import notificationsRouter from "./notifications";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(notificationsRouter);
router.use(storageRouter);

export default router;
