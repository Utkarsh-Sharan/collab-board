import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Api-Error.js";
import { Board } from "../models/board.model.js";
import mongoose from "mongoose";

export const verifyBoard = asyncHandler(async (req, res, next) => {
  const boardId = req.params.boardId;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(boardId))
    throw new ApiError(400, "Invalid board ID!");

  const board = await Board.findById(boardId);
  if (!board) throw new ApiError(404, "Board not found!");

  const member = board.members.find(
    (m) => m.userId.toString() === userId.toString(),
  );

  if(!member) throw new ApiError(403, "You are not a member of this board!");

  req.board = board;
  req.member = member;

  next();
});
