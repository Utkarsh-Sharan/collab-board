import { Router } from "express";
import {
  createList,
  getAllLists,
  updateList,
  deleteList,
  restoreDeletedList,
} from "../controllers/list.controller.js";
import { titleValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyBoard } from "../middlewares/board.middleware.js";
import {
  verifyActiveList,
  verifyDeletedList,
} from "../middlewares/list.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";
import { verifyArcjet } from "../middlewares/arcjet.middleware.js";

const router = Router();

//Rate-limiting
// router.use(verifyArcjet); TODO: Un-comment this

//Secured routes
const verifyUserAndBoard = [verifyJWT, verifyBoard];

router
  .route("/:boardId/lists")
  .post(
    verifyUserAndBoard,
    verifyRole("createList"),
    titleValidator(),
    validate,
    createList,
  );
router
  .route("/:boardId/lists")
  .get(verifyUserAndBoard, verifyRole("viewList"), getAllLists);
router
  .route("/:boardId/lists/:listId")
  .put(
    verifyUserAndBoard,
    verifyRole("updateList"),
    titleValidator(),
    validate,
    verifyActiveList,
    updateList,
  );
router
  .route("/:boardId/lists/:listId")
  .delete(
    verifyUserAndBoard,
    verifyRole("deleteList"),
    verifyActiveList,
    deleteList,
  );
router
  .route("/:boardId/lists/:listId/restore")
  .patch(
    verifyUserAndBoard,
    verifyRole("restoreList"),
    verifyDeletedList,
    restoreDeletedList,
  );

export default router;
