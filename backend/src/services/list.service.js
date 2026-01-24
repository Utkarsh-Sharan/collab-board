import { List } from "../models/list.model.js";

export const restoreList = async (deletedList) => {
  //Make space for active lists whose position > deleted list's position
  await List.updateMany(
    {
      boardId: deletedList.boardId,
      isDeleted: false,
      position: { $gte: deletedList.position },
    },
    { $inc: { position: 1 } },
  );

  //Restore deleted list
  deletedList.isDeleted = false;
  deletedList.deletedAt = undefined;
  deletedList.deletedBy = undefined;

  await deletedList.save({ validateBeforeSave: false });

  return deletedList._id;
};
