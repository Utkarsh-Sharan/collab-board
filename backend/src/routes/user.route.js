import { Router } from "express";
import { userTaskAssignmentVerification } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyArcjet } from "../middlewares/arcjet.middleware.js";

const router = Router();

//Rate-limiting
// router.use(verifyArcjet); TODO: Un-comment this

//Secured routes
router
  .route("/:userName/verify")
  .get(verifyJWT, userTaskAssignmentVerification);

export default router;
