import { Router } from "express";
import * as controller from "../controllers/books.controller";
import { authMiddleware } from "../../middlewares/clerkAuth";

const router = Router();

router.get("/", controller.getBooks);
router.post("/", authMiddleware, controller.createBook);
router.get("/:id", controller.getBook);
router.patch("/:id", authMiddleware, controller.updateBook);
router.delete("/:id", authMiddleware, controller.deleteBook);

router.post("/:id/send-request", authMiddleware, controller.sendRequest);
router.get("/:id/related", controller.getRelatedBooks);

export default router;