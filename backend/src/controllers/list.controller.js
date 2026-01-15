import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/Api-Response.js";
import { List } from "../models/list.model.js";
import { Task } from "../models/task.model.js";

const createList = asyncHandler(async (req, res) => {
  const board = req.board;
  const { title } = req.body;

  const newList = await List.create({
    title: title,
    boardId: board._id,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, { newList }, "Successfully created a new list!"),
    );
});

const getAllLists = asyncHandler(async (req, res) => {
  const boardId = req.board._id;

  const lists = await List.find({ boardId });

  return res
    .status(200)
    .json(new ApiResponse(200, { lists }, "Fetched all lists of this board!"));
});

const updateList = asyncHandler(async (req, res) => {
  const list = req.list;
  const { title } = req.body;

  list.title = title;
  await list.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, { list }, "List updated successfully!"));
});

const deleteList = asyncHandler(async (req, res) => {
  const boardId = req.board._id;
  const listId = req.list._id;

  await Task.deleteMany({
    $and: [{ boardId }, { listId }],
  });

  await List.deleteOne({_id: listId});

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "List deleted successfully!"));
});

export { createList, getAllLists, updateList, deleteList };
