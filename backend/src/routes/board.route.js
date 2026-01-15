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
import { verifyBoard } from "../middlewares/board.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";
import { titleValidator, invitationValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

//Secured routes
router.route("/").post(titleValidator(), validate, verifyJWT, createBoard);
router.route("/").get(verifyJWT, getAllBoards);
router.route("/:boardId").get(verifyJWT, verifyBoard, verifyRole("viewBoard"), getBoard);
router
  .route("/:boardId")
  .put(titleValidator(), validate, verifyJWT, verifyBoard, verifyRole("updateBoard"), updateBoard);
router
  .route("/:boardId")
  .delete(verifyJWT, verifyBoard, verifyRole("deleteBoard"), deleteBoard);
router
  .route("/:boardId/invite")
  .post(
    invitationValidator(),
    validate,
    verifyJWT,
    verifyBoard,
    verifyRole("inviteMember"),
    inviteMember,
  );
router.route("/:boardId/invite/:inviteToken").post(verifyJWT, acceptInvite);
router
  .route("/:boardId/member/:memberId")
  .patch(
    verifyJWT,
    verifyBoard,
    verifyRole("changeMemberRole"),
    changeMemberRole,
  );
router
  .route("/:boardId/member/:memberId")
  .delete(verifyJWT, verifyBoard, verifyRole("removeMember"), removeMember);

export default router;
