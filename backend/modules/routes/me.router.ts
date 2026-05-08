import { Router } from "express";
import { authMiddleware } from "../../middlewares/clerkAuth";
import * as controller from "../controllers/books.controller";

const router = Router();

router.use(authMiddleware);

router.get("/books", controller.getMyBooks);

export default router;