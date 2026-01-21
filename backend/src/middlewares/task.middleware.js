import mongoose from "mongoose";
import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/Api-Error.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyTask = asyncHandler(async (req, res, next) => {
  const list = req.list;
  const taskId = req.params.taskId;

  if (!mongoose.Types.ObjectId.isValid(taskId))
    throw new ApiError(400, "Task ID is invalid!");

  const task = await Task.findOne({
    _id: taskId,
    listId: list._id,
  });
  if (!task) throw new ApiError(404, "Task not found!");

  req.task = task;
  next();
});
