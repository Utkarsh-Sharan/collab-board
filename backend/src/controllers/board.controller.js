import { Board } from "../models/board.model.js";
import { List } from "../models/list.model.js";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { Invite } from "../models/invite.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Api-Error.js";
import { ApiResponse } from "../utils/Api-Response.js";
import {
  AvailableUserRoles,
  InviteStatusEnum,
  UserRolesEnum,
} from "../utils/constants.js";
import {
  sendEmail,
  boardInvitationMailgenContent,
} from "../utils/emailService.js";
import crypto from "crypto";

const createBoard = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const user = req.user;

  const board = await Board.create({
    title,
    description,
    createdBy: user._id,
    members: [{ userId: user._id, role: UserRolesEnum.ADMIN }],
    adminCount: 1,
  });

  const createdBoard = await Board.findById(board._id);

  if (!createdBoard)
    throw new ApiError(500, "Somthing went wrong while creating the board!");

  return res
    .status(201)
    .json(
      new ApiResponse(201, { createdBoard }, "Board created successfully!"),
    );
});

const getAllBoards = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const boards = await Board.find({
    "members.userId": userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { boards }, "Fetched boards successfully!"));
});

const getBoard = asyncHandler(async (req, res) => {
  const boardId = req.board._id;
  const userId = req.user._id;

  const board = await Board.findOne({
    _id: boardId,
    "members.userId": userId,
  });

  if (!board) throw new ApiError(404, "Board not found or access denied!");

  return res
    .status(200)
    .json(new ApiResponse(200, { board }, "Fetch board successfully!"));
});

const updateBoard = asyncHandler(async (req, res) => {
  const boardId = req.board._id; //via authorization middleware
  const { title, description } = req.body;

  const board = await Board.findById(boardId);
  if (!board) throw new ApiError(404, "Board not found!");

  board.title = title;
  board.description = description;

  await board.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { board }, "Board updated successfully!"));
});

const deleteBoard = asyncHandler(async (req, res) => {
  const boardId = req.board._id;

  const deletedBoard = await Board.findByIdAndDelete(boardId);
  if (!deletedBoard)
    throw new ApiError(404, "Board not found or already deleted!");

  await List.deleteMany({ boardId });
  await Task.deleteMany({ boardId });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { deletedBoard }, "Board deleted successfully!"),
    );
});

const inviteMember = asyncHandler(async (req, res) => {
  const { email, role } = req.body;
  const boardId = req.board._id;
  const adminName = req.user.fullName;

  if (!AvailableUserRoles.includes(role))
    throw new ApiError(400, "Invalid role provided!");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found!");

  const isAlreadyMember = await Board.exists({
    _id: boardId,
    "members.userId": user._id,
  });

  if (isAlreadyMember)
    throw new ApiError(
      400,
      "Board not found or User is already a member of this board!",
    );

  const existingInvite = await Invite.findOne({
    email,
    boardId,
    status: InviteStatusEnum.PENDING,
  });
  if (existingInvite)
    throw new ApiError(400, "An invite is already pending for this user!");

  const invite = await Invite.create({
    email: email,
    boardId: boardId,
    invitedBy: adminName,
    role: role,
  });

  const { unhashedToken, hashedToken, tokenExpiry } =
    invite.generateInviteToken();

  invite.token = hashedToken;
  invite.tokenExpiry = tokenExpiry;
  await invite.save({ validateBeforeSave: false });

  const createdInvite = await Invite.findById(invite._id).select(
    "-token -tokenExpiry",
  );

  await sendEmail({
    email: user?.email,
    subject: "Board invitation",
    mailgenContent: boardInvitationMailgenContent(
      user.fullName,
      `${process.env.BOARD_INVITATION_URL}/${unhashedToken}`,
    ),
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { createdInvite },
        "Board invitation mail sent successfully!",
      ),
    );
});

const acceptInvite = asyncHandler(async (req, res) => {
  const { unhashedToken } = req.params;
  const user = req.user;

  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex");

  const invite = await Invite.findOne({
    token: hashedToken,
    status: InviteStatusEnum.PENDING,
    tokenExpiry: { $gt: Date.now() },
  });

  if (!invite) throw new ApiError(400, "Invite is invalid or has expired!");

  const board = await Board.findById(invite.boardId);
  if (!board) throw new ApiError(404, "Board not found!");

  board.members.push({
    userId: user._id,
    role: invite.role,
  });

  if (invite.role === UserRolesEnum.ADMIN) ++board.adminCount;

  invite.status = InviteStatusEnum.ACCEPTED;
  invite.token = undefined;
  invite.tokenExpiry = undefined;

  await Promise.all([
    board.save({ validateBeforeSave: false }),
    invite.save({ validateBeforeSave: false })
  ])

  return res
    .status(200)
    .json(new ApiResponse(200, { board }, "User accepted the invite!"));
});

const changeMemberRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { newRole } = req.body;
  const boardId = req.board._id;

  if (!AvailableUserRoles.includes(newRole))
    throw new ApiError(400, "Invalid role!");

  const board = await Board.findOne({
    _id: boardId,
    "members.userId": userId,
  });
  if (!board)
    throw new ApiError(
      400,
      "Board not found or User is not a member of this board!",
    );

  const member = board.members.find(
    (m) => m.userId.toString() === userId.toString(),
  );

  const prevRole = member.role;
  if (prevRole !== newRole) member.role = newRole;

  if (prevRole !== UserRolesEnum.ADMIN && newRole === UserRolesEnum.ADMIN)
    ++board.adminCount;
  else if (prevRole === UserRolesEnum.ADMIN && newRole !== UserRolesEnum.ADMIN)
    --board.adminCount;

  await board.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, { board }, "User role updated successfully!"));
});

const removeMember = asyncHandler(async (req, res) => {
  const boardId = req.board._id;
  const userId = req.user._id;

  const board = await Board.findOne({
    _id: boardId,
    "members.userId": userId,
  });
  if (!board)
    throw new ApiError(
      400,
      "Board not found or User is not a member of this board!",
    );

  const member = board.members.find(
    (m) => m.userId.toString() === userId.toString(),
  );

  if (member.role === UserRolesEnum.ADMIN && board.adminCount === 1) {
    throw new ApiError(400, "Cannot remove the last Admin from the board!");
  }

  // Atomically remove member and decrement adminCount if needed
  await Board.updateOne(
    { _id: boardId },
    {
      $pull: { "members.userId": userId },
      ...(member.role === UserRolesEnum.ADMIN
        ? { $inc: { adminCount: -1 } }
        : {}),
    },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Member removed successfully!"));
});

export {
  createBoard,
  getAllBoards,
  getBoard,
  updateBoard,
  deleteBoard,
  inviteMember,
  acceptInvite,
  changeMemberRole,
  removeMember,
};
