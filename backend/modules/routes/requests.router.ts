import { Router } from "express";
import { authMiddleware } from "../../middlewares/clerkAuth";

import * as requestsController from "../controllers/requests.controller"

const router = Router();

router.use(authMiddleware);

router.get("/incoming", requestsController.getIncoming);
router.get("/outgoing", requestsController.getOutgoing);
router.post("/:id/accept", requestsController.acceptRequest);
router.post("/:id/reject", requestsController.rejectRequest);

export default router;