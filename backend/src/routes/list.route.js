import { Router } from "express";
import {
  createList,
  getAllLists,
  updateList,
  deleteList,
} from "../controllers/list.controller.js";
import { titleValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyBoard } from "../middlewares/board.middleware.js";
import { verifyList } from "../middlewares/list.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";

const router = Router();

//Secured routes
router
  .route("/:boardId/lists")
  .post(
    verifyJWT,
    verifyRole("createList"),
    titleValidator(),
    validate,
    verifyBoard,
    createList,
  );
router
  .route("/:boardId/lists")
  .get(verifyJWT, verifyRole("viewList"), verifyBoard, getAllLists);
router
  .route("/:boardId/lists/:listId")
  .put(
    verifyJWT,
    verifyRole("updateList"),
    titleValidator(),
    validate,
    verifyBoard,
    verifyList,
    updateList,
  );
router
  .route("/:boardId/lists/:listId")
  .delete(
    verifyJWT,
    verifyRole("deleteList"),
    verifyBoard,
    verifyList,
    deleteList,
  );

export default router;
