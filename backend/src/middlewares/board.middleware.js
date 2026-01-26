import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Api-Error.js";
import { Board } from "../models/board.model.js";
import mongoose from "mongoose";

const verifyActiveBoard = asyncHandler(async (req, res, next) => {
  const boardId = req.params.boardId;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(boardId))
    throw new ApiError(400, "Invalid board ID!");

  const board = await Board.findOne({
    _id: boardId,
    isDeleted: false,
  });
  if (!board) throw new ApiError(404, "Board not found!");

  const member = board.members.find(
    (m) => m.userId.toString() === userId.toString(),
  );

  if (!member) throw new ApiError(403, "You are not a member of this board!");

  req.board = board;
  req.member = member;

  next();
});

const verifyDeletedBoard = asyncHandler(async (req, res, next) => {
  const boardId = req.params.boardId;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(boardId))
    throw new ApiError(400, "Board ID is invalid!");

  const deletedBoard = await Board.findOne({
    _id: boardId,
    isDeleted: true,
  });

  if (!deletedBoard) throw new ApiError(404, "Board not found!");

  const member = deletedBoard.members.find(
    (m) => m.userId.toString() === userId.toString(),
  );

  if (!member) throw new ApiError(400, "You are not a member of this board!");

  req.deletedBoard = deletedBoard;
  req.member = member;

  next();
});

export { verifyActiveBoard, verifyDeletedBoard };
