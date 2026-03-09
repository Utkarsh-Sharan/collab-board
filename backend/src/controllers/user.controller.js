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
    .json(
      new ApiResponse(
        200,
        { userId: userToAdd._id },
        "Fetched user successfully!",
      ),
    );
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) throw new ApiError(500, "Something went wrong!");

  return res
    .status(200)
    .json(new ApiResponse(200, { users }, "Fetched all users!"));
});

const searchUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if(!email) throw new ApiError(400, "Email is required!");

  const user = await User.findOne(email);
  if (!user) throw new ApiError(404, "User not found!");

  return res.status(200).json(new ApiResponse(200, { user }, "User found!"));
});

export { getAllUsers, searchUser, userTaskAssignmentVerification };
