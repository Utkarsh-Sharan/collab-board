import { permissions } from "../utils/permissions.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Api-Error.js";

export const verifyRole = (action) =>
  asyncHandler(async (req, res, next) => {
    const member = req.member;

    const allowedRoles = permissions[action];
    if (!allowedRoles)
      throw new ApiError(500, `No permissions found for performing ${action}!`);

    if (!allowedRoles.includes(member.role))
      throw new ApiError(
        403,
        "You do not have permission to perform this action!",
      );

    next();
  });
