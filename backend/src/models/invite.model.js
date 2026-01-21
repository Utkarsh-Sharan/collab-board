import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
import { InviteStatusEnum, AvailableInviteStatus } from "../utils/constants.js";
import { UserRolesEnum } from "../utils/constants.js";

const inviteSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    invitedBy: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: UserRolesEnum.VIEWER,
    },
    token: {
      type: String,
    },
    tokenExpiry: {
      type: Date,
    },
    status: {
      type: String,
      enum: AvailableInviteStatus,
      default: InviteStatusEnum.PENDING,
    },
  },
  { timestamps: true },
);

inviteSchema.methods.generateInviteToken = () => {
  const unhashedToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex");
  const tokenExpiry = Date.now() + 15 * 60 * 1000; //15 minutes expiry

  return { unhashedToken, hashedToken, tokenExpiry };
};

export const Invite = mongoose.model("Invite", inviteSchema);
