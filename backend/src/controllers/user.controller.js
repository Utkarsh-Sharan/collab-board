import { Board } from "../models/board.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/Api-Error.js";
import { ApiResponse } from "../utils/Api-Response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const userTaskAssignmentVerification = asyncHandler(async (req, res) => {
  const userName = req.params.userName;
  const { boardId } = req.query;

  const userToAdd = await User.findOne({ userName }).select(
    "-password -refreshToken -emailVerificationExpiry -emailVerificationToken",
  );

  if (!userToAdd) throw new ApiError(404, "User not found!");

  const board = await Board.findById(boardId);
  const isAMember = board.members.find(
    (m) => m.userId.toString() === userToAdd._id.toString(),
  );

  if (!isAMember)
    throw new ApiError(400, "User is not a member of this board!");

  return res
    .status(200)
    .json(new ApiResponse(200, { userId: userToAdd._id }, "Fetched user successfully!"));
});

export { userTaskAssignmentVerification };
