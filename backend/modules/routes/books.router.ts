import { Router } from "express";
import * as controller from "../controllers/books.controller";
import { authMiddleware } from "../../middlewares/JWTAuth";

const router = Router();

router.use(authMiddleware);

router.get("/", controller.getBooks);
router.post("/", controller.createBook);
router.get("/:id", controller.getBook);
router.patch("/:id", controller.updateBook);
router.delete("/:id", controller.deleteBook);

export default router;