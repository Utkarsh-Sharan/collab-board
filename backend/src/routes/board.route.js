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
import {
  boardCreateOrUpdateValidator,
  invitationValidator,
} from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

//Secured routes
router
  .route("/")
  .post(boardCreateOrUpdateValidator(), validate, verifyJWT, createBoard);
router.route("/").get(verifyJWT, getAllBoards);
router.route("/:boardId").get(verifyJWT, verifyBoard, getBoard);
router
  .route("/:boardId")
  .put(
    boardCreateOrUpdateValidator(),
    validate,
    verifyJWT,
    verifyBoard,
    updateBoard,
  );
router.route("/:boardId").delete(verifyJWT, verifyBoard, deleteBoard);
router
  .route("/:boardId/invite")
  .post(invitationValidator(), validate, verifyJWT, verifyBoard, inviteMember);
router.route("/:boardId/invite/:inviteToken").post(verifyJWT, acceptInvite);
router
  .route("/:boardId/member/:memberId")
  .patch(verifyJWT, verifyBoard, changeMemberRole);
router
  .route("/:boardId/member/:memberId")
  .delete(verifyJWT, verifyBoard, removeMember);

export default router;
