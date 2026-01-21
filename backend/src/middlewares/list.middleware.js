import mongoose from "mongoose";
import { List } from "../models/list.model.js";
import { ApiError } from "../utils/Api-Error.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyList = asyncHandler(async (req, res, next) => {
  const board = req.board;
  const listId = req.params.listId;

  if(!mongoose.Types.ObjectId.isValid(listId))
    throw new ApiError(400, "Invalid list ID!");

  const list = await List.findOne({
    _id: listId,
    boardId: board._id,
  });

  if(!list) throw new ApiError(404, "List not found!");

  req.list = list;
  next();
});
