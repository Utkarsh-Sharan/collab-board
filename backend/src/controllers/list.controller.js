import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/Api-Response.js";
import { List } from "../models/list.model.js";
import { Task } from "../models/task.model.js";
import { Board } from "../models/board.model.js";

const createList = asyncHandler(async (req, res) => {
  const board = req.board;
  const { title } = req.body;

  const lastList = await List.findOne({ boardId: board._id })
    .sort("-position")
    .select("position");

  const position = lastList ? lastList.position + 1 : 0;

  const newList = await List.create({
    title: title,
    boardId: board._id,
    position,
  });

  board.lists.push(newList._id);
  await board.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(
      new ApiResponse(201, { newList }, "Successfully created a new list!"),
    );
});

const getAllLists = asyncHandler(async (req, res) => {
  const boardId = req.board._id;

  const lists = await List.find({ boardId, isDeleted: false });

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
  const list = req.list;

  await Task.updateMany(
    { listId: list._id, isDeleted: false },
    {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: req.user._id,
    },
  );

  list.isDeleted = true;
  list.deletedAt = new Date();
  list.deletedBy = req.user._id;

  await list.save();

  await List.updateMany(
    {
      boardId: list.boardId,
      isDeleted: false,
      position: { $gt: list.position },
    },
    { $inc: { position: -1 } },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "List deleted successfully!"));
});



export { createList, getAllLists, updateList, deleteList };
