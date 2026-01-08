import mongoose, { Schema } from "mongoose";
import crypto from "crypto";

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      default: "Viewer",
    },
    token: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Expired", "Revoked"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

inviteSchema.statics.generateInviteToken = () => {
  const unhashedToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex");
  const tokenExpiry = Date.now() + 15 * 60 * 1000; //15 minutes expiry

  return { unhashedToken, hashedToken, tokenExpiry };
};

export const Invite = mongoose.model("Invite", inviteSchema);
