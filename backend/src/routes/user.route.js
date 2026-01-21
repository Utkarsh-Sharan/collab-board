import { Router } from "express";
import { userTaskAssignmentVerification } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/:userName/verify")
  .get(verifyJWT, userTaskAssignmentVerification);

export default router;
