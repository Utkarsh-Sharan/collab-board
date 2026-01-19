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

const router = Router();

//Secured routes
router
  .route("/:boardId/lists/:listId/tasks")
  .post(
    verifyJWT,
    verifyRole("createTask"),
    titleValidator(),
    validate,
    verifyBoard,
    verifyList,
    createTask,
  );
router
  .route("/:boardId/lists/:listId/tasks")
  .get(verifyJWT, verifyRole("viewTask"), verifyBoard, verifyList, getAllTasks);
router
  .route("/:boardId/lists/:listId/tasks/:taskId")
  .put(
    verifyJWT,
    verifyRole("updateTask"),
    verifyBoard,
    verifyList,
    verifyTask,
    updateTask,
  );
router
  .route("/:boardId/lists/:listId/tasks/:taskId/move")
  .patch(
    verifyJWT,
    verifyRole("moveTask"),
    verifyBoard,
    verifyList,
    verifyTask,
    moveTask,
  );
router
  .route("/:boardId/lists/:listId/tasks/:taskId")
  .delete(
    verifyJWT,
    verifyRole("deleteTask"),
    verifyBoard,
    verifyList,
    verifyTask,
    deleteTask,
  );
