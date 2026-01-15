import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Api-Error.js";
import { ApiResponse } from "../utils/Api-Response.js";
import { UserRolesEnum } from "../utils/constants.js";
import { List } from "../models/list.model.js";

const createList = asyncHandler(async (req, res) => {
  if (req.member.role === UserRolesEnum.VIEWER)
    throw new ApiError(
      400,
      "Only Admins and Editors are allowed to create lists!",
    );

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

export { createList };
