import { AvailableUserRoles } from "./constants.js";

const [admin, editor, viewer] = AvailableUserRoles;

export const permissions = {
  viewBoard: [admin, editor, viewer],
  updateBoard: [admin],
  deleteBoard: [admin],
  inviteMember: [admin],
  changeMemberRole: [admin],
  removeMember: [admin],
  createList: [admin, editor],
  viewList: [admin, editor, viewer],
  updateList: [admin, editor],
  deleteList: [admin, editor],
  createTask: [admin, editor],
  viewTask: [admin, editor, viewer],
  updateTask: [admin, editor],
  moveTask: [admin, editor],
  deleteTask: [admin, editor],
};
