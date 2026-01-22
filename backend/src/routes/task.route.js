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
import { verifyBoard } from "../middlewares/board.middleware.js";
import { verifyList } from "../middlewares/list.middleware.js";
import { verifyActiveTask, verifyDeletedTask } from "../middlewares/task.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";
import { verifyArcjet } from "../middlewares/arcjet.middleware.js";

const router = Router();

//Rate-limiting
// router.use(verifyArcjet); TODO: Un-comment this

//Secured routes
const verifyUserAndBoard = [verifyJWT, verifyBoard];
const verifyListAndActiveTask = [verifyList, verifyActiveTask];
const verifyListAndDeletedTask = [verifyList, verifyDeletedTask];

router
  .route("/:boardId/lists/:listId/tasks")
  .post(
    verifyUserAndBoard,
    verifyRole("createTask"),
    verifyList,
    titleValidator(),
    validate,
    createTask,
  );
router
  .route("/:boardId/lists/:listId/tasks")
  .get(verifyUserAndBoard, verifyRole("viewTask"), verifyList, getAllTasks);
router
  .route("/:boardId/lists/:listId/tasks/:taskId")
  .put(
    verifyUserAndBoard,
    verifyRole("updateTask"),
    verifyListAndActiveTask,
    updateTask,
  );
router
  .route("/:boardId/lists/:listId/tasks/:taskId/move")
  .patch(
    verifyUserAndBoard,
    verifyRole("moveTask"),
    verifyListAndActiveTask,
    moveTask,
  );
router
  .route("/:boardId/lists/:listId/tasks/:taskId")
  .delete(
    verifyUserAndBoard,
    verifyRole("deleteTask"),
    verifyListAndActiveTask,
    deleteTask,
  );
router
  .route("/:boardId/lists/:listId/tasks/:taskId/restore")
  .patch(
    verifyUserAndBoard,
    verifyRole("restoreTask"),
    verifyListAndDeletedTask,
    restoreDeletedTask,
  );

export default router;
