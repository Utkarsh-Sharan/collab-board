import { Task } from "../models/task.model.js";

export const restoreTask = async (deletedTask) => {
  await Task.updateMany(
    {
      listId: deletedTask.listId,
      isDeleted: false,
      position: { $gte: deletedTask.position },
    },
    { $inc: { position: 1 } },
  );

  deletedTask.isDeleted = false;
  deletedTask.deletedAt = undefined;
  deletedTask.deletedBy = undefined;

  await deletedTask.save({ validateBeforeSave: false });
};
