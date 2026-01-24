import { Router } from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
  moveTask,
  deleteTask,
  restoreDeletedTask,
} from "../controllers/task.controller.js";
import { titleValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyActiveBoard } from "../middlewares/board.middleware.js";
import { verifyActiveList } from "../middlewares/list.middleware.js";
import {
  verifyActiveTask,
  verifyDeletedTask,
} from "../middlewares/task.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";
import { verifyArcjet } from "../middlewares/arcjet.middleware.js";

const router = Router();

//Rate-limiting
// router.use(verifyArcjet); TODO: Un-comment this

//Secured routes
const verifyUserAndBoard = [verifyJWT, verifyActiveBoard];
const verifyActiveListAndActiveTask = [verifyActiveList, verifyActiveTask];
const verifyActiveListAndDeletedTask = [verifyActiveList, verifyDeletedTask];

router
  .route("/:boardId/lists/:listId/tasks")
  .post(
    verifyUserAndBoard,
    verifyRole("createTask"),
    verifyActiveList,
    titleValidator(),
    validate,
    createTask,
  );
router
  .route("/:boardId/lists/:listId/tasks")
  .get(
    verifyUserAndBoard,
    verifyRole("viewTask"),
    verifyActiveList,
    getAllTasks,
  );
router
  .route("/:boardId/lists/:listId/tasks/:taskId")
  .put(
    verifyUserAndBoard,
    verifyRole("updateTask"),
    verifyActiveListAndActiveTask,
    updateTask,
  );
router
  .route("/:boardId/lists/:listId/tasks/:taskId/move")
  .patch(
    verifyUserAndBoard,
    verifyRole("moveTask"),
    verifyActiveListAndActiveTask,
    moveTask,
  );
router
  .route("/:boardId/lists/:listId/tasks/:taskId")
  .delete(
    verifyUserAndBoard,
    verifyRole("deleteTask"),
    verifyActiveListAndActiveTask,
    deleteTask,
  );
router
  .route("/:boardId/lists/:listId/tasks/:taskId/restore")
  .patch(
    verifyUserAndBoard,
    verifyRole("restoreTask"),
    verifyActiveListAndDeletedTask,
    restoreDeletedTask,
  );

export default router;
