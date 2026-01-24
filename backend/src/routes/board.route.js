import { Router } from "express";
import {
  createBoard,
  getAllBoards,
  getBoard,
  updateBoard,
  deleteBoard,
  restoreDeletedBoard,
  inviteMember,
  acceptInvite,
  changeMemberRole,
  removeMember,
} from "../controllers/board.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  verifyActiveBoard,
  verifyDeletedBoard,
} from "../middlewares/board.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";
import { titleValidator, invitationValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { verifyArcjet } from "../middlewares/arcjet.middleware.js";

const router = Router();

//Rate-limiting
// router.use(verifyArcjet); TODO: Un-comment this

//Secured routes
const verifyUserAndActiveBoard = [verifyJWT, verifyActiveBoard];

router.route("/").post(verifyJWT, titleValidator(), validate, createBoard);
router.route("/").get(verifyJWT, getAllBoards);
router
  .route("/:boardId")
  .get(verifyUserAndActiveBoard, verifyRole("viewBoard"), getBoard);
router
  .route("/:boardId")
  .put(
    verifyUserAndActiveBoard,
    titleValidator(),
    validate,
    verifyRole("updateBoard"),
    updateBoard,
  );
router
  .route("/:boardId")
  .delete(verifyUserAndActiveBoard, verifyRole("deleteBoard"), deleteBoard);
router
  .route("/:boardId/restore")
  .patch(
    verifyJWT,
    verifyDeletedBoard,
    verifyRole("restoreBoard"),
    restoreDeletedBoard,
  );
router
  .route("/:boardId/invite")
  .post(
    verifyUserAndActiveBoard,
    invitationValidator(),
    validate,
    verifyRole("inviteMember"),
    inviteMember,
  );
router.route("/:boardId/invite/:inviteToken").post(verifyJWT, acceptInvite);
router
  .route("/:boardId/member/:memberId")
  .patch(
    verifyUserAndActiveBoard,
    verifyRole("changeMemberRole"),
    changeMemberRole,
  );
router
  .route("/:boardId/member/:memberId")
  .delete(verifyUserAndActiveBoard, verifyRole("removeMember"), removeMember);

export default router;
