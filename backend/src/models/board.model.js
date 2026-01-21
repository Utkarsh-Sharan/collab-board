import mongoose, { Schema } from "mongoose";
import { UserRolesEnum, AvailableUserRoles } from "../utils/constants.js";

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminCount: {
      type: Number,
      default: 0,
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: AvailableUserRoles,
          default: UserRolesEnum.VIEWER,
        },
      },
    ],
    lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List",
      },
    ],
  },
  { timestamps: true },
);

boardSchema.index({ "members.userId": 1 });

export const Board = mongoose.model("Board", boardSchema);
