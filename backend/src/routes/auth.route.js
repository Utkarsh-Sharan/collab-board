import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = Router();

//Un-secured routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//Secured routes
router.route("/logout").post(loginUser);

export default router;
