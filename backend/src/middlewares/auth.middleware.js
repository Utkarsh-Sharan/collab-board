import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Api-Error.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization").replace("Bearer ", "");

    if(!accessToken) throw new ApiError(401, "Unauthorized request!");

    try {
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select(
          "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
        );

        if(!user) throw new ApiError(401, "Invalid access token");

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid access token", error);
    }
});
