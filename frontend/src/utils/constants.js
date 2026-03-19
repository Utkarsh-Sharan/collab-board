export const ActionsOnEntitiesEnum = {
  REMOVE_USER: "Remove-User",
  UPDATE_USER_ROLE: "Update-User",
  DELETE_BOARD: "Delete-Board",
};

export const ActionDescriptionEnum = {
  REMOVE_USER: `Are you sure you want to remove this user? This action cannot be undone.`,
  UPDATE_USER_ROLE: `Change this member's role? Their permissions will update right away.`,
  DELETE_BOARD: `Delete this board? All lists, tasks, and team data will be removed, but you can restore it within 10 days. Retrieve deleted boards from Deleted section.`,
};
