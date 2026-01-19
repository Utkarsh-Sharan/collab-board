import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/Api-Response.js";
import { List } from "../models/list.model.js";
import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/Api-Error.js";

const createTask = asyncHandler(async (req, res) => {
  const boardId = req.board._id;
  const list = req.list;
  const { title, description, assignedTo, dueDate, labels } = req.body;

  if (!assignedTo) throw new ApiError(400, "Assign task to at least 1 user!");
  
  //O(logn) (or even O(1)) operation if index and query design are correct
  const lastTask = await Task.findOne({ boardId, listId: list._id })
    .sort("-position")
    .select("position");
  const position = lastTask ? lastTask.position + 1 : 0;

  const newTask = await Task.create({
    title,
    description,
    assignedTo,
    dueDate,
    labels,
    position,
    boardId,
    listId: list._id,
  });

  list.tasks.push(newTask._id);
  await list.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(201, { newTask }, "Task created successfully!"));
});

const getAllTasks = asyncHandler(async (req, res) => {
  const listId = req.list._id;

  const tasks = await Task.find({ listId }).sort("position");

  return res
    .status(200)
    .json(new ApiResponse(200, { tasks }, "Fetched all tasks successfully!"));
});

const updateTask = asyncHandler(async (req, res) => {
  const task = req.task;
  const { title, description, assignedTo, dueDate, labels } = req.body;

  if (!assignedTo) throw new ApiError(400, "Assign task to at least 1 user!");

  task.title = title;
  task.description = description;
  task.assignedTo = assignedTo;
  task.dueDate = dueDate;
  task.labels = labels;

  await task.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { updatedTask: task }, "Task updated successfully!"),
    );
});

const moveTask = asyncHandler(async (req, res) => {
  const task = req.task;
  const sourceListId = task.listId.toString();
  const { destinationListId, destinationPosition } = req.body;

  if (!destinationListId || destinationPosition === undefined)
    throw new ApiError(
      400,
      `Destination list's ID and position both are required`,
    );

  //Remove task from source list if changing to another list
  if (sourceListId !== destinationListId) {
    await Task.updateMany(
      {
        listId: sourceListId,
        position: { $gt: task.position },
      },
      { $inc: { position: -1 } },
    );
  }
  //Move within same list
  else {
    const direction = destinationPosition > task.position ? -1 : 1;
    const start = Math.min(task.position, destinationPosition);
    const end = Math.max(task.position, destinationPosition);

    await Task.updateMany(
      {
        listId: sourceListId,
        position: { $gte: start, $lte: end },
        _id: { $ne: task._id },
      },
      { $inc: { position: direction } },
    );
  }

  //Make space in destination list
  if (sourceListId !== destinationListId) {
    await Task.updateOne(
      {
        listId: destinationListId,
        position: { $gte: destinationPosition },
      },
      { $inc: { position: 1 } },
    );
  }

  task.listId = destinationListId;
  task.position = destinationPosition;
  await task.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, { updatedTask: task }, "Task moved successfully!"),
    );
});

const deleteTask = asyncHandler(async (req, res) => {
  const list = req.list;
  const taskId = req.task._id;

  await Task.deleteOne({ taskId });
  await List.updateOne({ _id: list._id }, { $pull: { tasks: taskId } });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully!"));
});

export { createTask, getAllTasks, updateTask, moveTask, deleteTask };
