import { validationResult } from "express-validator";
import { ApiError } from "../utils/Api-Error.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = errors.array().reduce((acc, err) => {
    if (!acc[err.path]) acc[err.path] = err.msg;

    return acc;
  }, {});

  throw new ApiError(422, "Received data is not valid!", extractedErrors);
};
