import { Router } from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
  moveTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { titleValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyBoard } from "../middlewares/board.middleware.js";
import { verifyList } from "../middlewares/list.middleware.js";
import { verifyTask } from "../middlewares/task.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";
import { verifyArcjet } from "../middlewares/arcjet.middleware.js";

const router = Router();

//Rate-limiting
// router.use(verifyArcjet); TODO: Un-comment this

//Secured routes
router
  .route("/:boardId/lists/:listId/tasks")
  .post(
    verifyJWT,
    verifyBoard,
    verifyRole("createTask"),
    titleValidator(),
    validate,
    verifyList,
    createTask,
  );
router
  .route("/:boardId/lists/:listId/tasks")
  .get(verifyJWT, verifyBoard, verifyRole("viewTask"), verifyList, getAllTasks);
router
  .route("/:boardId/lists/:listId/tasks/:taskId")
  .put(
    verifyJWT,
    verifyBoard,
    verifyRole("updateTask"),
    verifyList,
    verifyTask,
    updateTask,
  );
router
  .route("/:boardId/lists/:listId/tasks/:taskId/move")
  .patch(
    verifyJWT,
    verifyBoard,
    verifyRole("moveTask"),
    verifyList,
    verifyTask,
    moveTask,
  );
router
  .route("/:boardId/lists/:listId/tasks/:taskId")
  .delete(
    verifyJWT,
    verifyBoard,
    verifyRole("deleteTask"),
    verifyList,
    verifyTask,
    deleteTask,
  );

export default router;
