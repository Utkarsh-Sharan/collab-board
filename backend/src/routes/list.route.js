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
import { verifyActiveList } from "../middlewares/list.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";
import { verifyArcjet } from "../middlewares/arcjet.middleware.js";

const router = Router();

//Rate-limiting
// router.use(verifyArcjet); TODO: Un-comment this

//Secured routes
router
  .route("/:boardId/lists")
  .post(
    verifyJWT,
    verifyBoard,
    verifyRole("createList"),
    titleValidator(),
    validate,
    createList,
  );
router
  .route("/:boardId/lists")
  .get(verifyJWT, verifyBoard, verifyRole("viewList"), getAllLists);
router
  .route("/:boardId/lists/:listId")
  .put(
    verifyJWT,
    verifyBoard,
    verifyRole("updateList"),
    titleValidator(),
    validate,
    verifyActiveList,
    updateList,
  );
router
  .route("/:boardId/lists/:listId")
  .delete(
    verifyJWT,
    verifyBoard,
    verifyRole("deleteList"),
    verifyActiveList,
    deleteList,
  );

export default router;
