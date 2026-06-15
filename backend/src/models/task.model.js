import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
    assignedTo: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        fullName: {
          type: String,
        },
        role: {
          type: String,
        },
        avatar: {
          type: String,
        },
      },
    ],
    dueDate: {
      type: Date,
    },
    labels: {
      type: [String],
    },
    position: {
      type: Number,
    },
    isDeleted:{
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true },
);

taskSchema.index({ boardId: 1, listId: 1, position: -1 });

export const Task = mongoose.model("Task", taskSchema);
