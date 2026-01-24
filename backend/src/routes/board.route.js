import { Router } from "express";
import {
  createBoard,
  getAllBoards,
  getBoard,
  updateBoard,
  deleteBoard,
  inviteMember,
  acceptInvite,
  changeMemberRole,
  removeMember,
} from "../controllers/board.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyActiveBoard } from "../middlewares/board.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";
import { titleValidator, invitationValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { verifyArcjet } from "../middlewares/arcjet.middleware.js";

const router = Router();

//Rate-limiting
// router.use(verifyArcjet); TODO: Un-comment this

//Secured routes
router.route("/").post(titleValidator(), validate, verifyJWT, createBoard);
router.route("/").get(verifyJWT, getAllBoards);
router
  .route("/:boardId")
  .get(verifyJWT, verifyActiveBoard, verifyRole("viewBoard"), getBoard);
router
  .route("/:boardId")
  .put(
    titleValidator(),
    validate,
    verifyJWT,
    verifyActiveBoard,
    verifyRole("updateBoard"),
    updateBoard,
  );
router
  .route("/:boardId")
  .delete(verifyJWT, verifyActiveBoard, verifyRole("deleteBoard"), deleteBoard);
router
  .route("/:boardId/invite")
  .post(
    invitationValidator(),
    validate,
    verifyJWT,
    verifyActiveBoard,
    verifyRole("inviteMember"),
    inviteMember,
  );
router.route("/:boardId/invite/:inviteToken").post(verifyJWT, acceptInvite);
router
  .route("/:boardId/member/:memberId")
  .patch(
    verifyJWT,
    verifyActiveBoard,
    verifyRole("changeMemberRole"),
    changeMemberRole,
  );
router
  .route("/:boardId/member/:memberId")
  .delete(
    verifyJWT,
    verifyActiveBoard,
    verifyRole("removeMember"),
    removeMember,
  );

export default router;
