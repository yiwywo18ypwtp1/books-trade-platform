import { Router } from "express";

import * as usersController from "../controllers/users.controller";
import { authMiddleware } from "../../middlewares/JWTAuth";
import { requireAdmin } from "../../middlewares/adminRequire";

const router = Router();

router.use(authMiddleware);
router.use(requireAdmin);

router.get("/", usersController.getUsers);
router.post("/", usersController.createUser);
router.get("/:id", usersController.getUser);
router.patch("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);


export default router; 