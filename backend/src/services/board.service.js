import { List } from "../models/list.model.js";
import { Task } from "../models/task.model.js";
import { restoreList } from "./list.service.js";
import { restoreTask } from "./task.service.js";

export const restoreBoard = async (deletedBoard) => {
  //Restore deleted board
  deletedBoard.isDeleted = false;
  deletedBoard.deletedAt = undefined;
  deletedBoard.deletedBy = undefined;

  await deletedBoard.save();

  //Restore Lists of deleted board (O(n))
  const deletedLists = await List.find({
    boardId: deletedBoard._id,
    isDeleted: true,
  });

  for (const list of deletedLists) await restoreList(list);

  //Restore Tasks of deleted board (O(n))
  const deletedTasks = await Task.find({
    boardId: deletedBoard._id,
    isDeleted: true,
  });

  for (const task of deletedTasks) await restoreTask(task);

  return deletedBoard._id;
};
