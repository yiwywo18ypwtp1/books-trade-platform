import { Router } from "express";

import * as authController from "../controllers/auth.controller";
import { authMiddleware } from "../../middlewares/clerkAuth";

const router = Router();

router.get("/me", authMiddleware, authController.me);

export default router;