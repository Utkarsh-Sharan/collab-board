import arcjet from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Api-Error.js";

export const verifyArcjet = asyncHandler(async (req, res, next) => {
  const decision = await arcjet.protect(req);

  if(decision.isDenied()){
    if(decision.reason.isRateLimit())
        throw new ApiError(429, "Too many requests!");
    else if(decision.reason.isBot())
        throw new ApiError(403, "Bot access denied!");
    else throw new ApiError(403, "Access denied by security policy!");
  }

  if(decision.results.some(isSpoofedBot))
    throw new ApiError(403, "Malicious bot activity detected!");

  next();
});
