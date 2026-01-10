export const UserRolesEnum = {
  ADMIN: "Admin",
  EDITOR: "Editor",
  VIEWER: "Viewer",
};

export const AvailableUserRoles = Object.values(UserRolesEnum);

export const InviteStatusEnum = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  EXPIRED: "Expired",
  REVOKED: "Revoked",
};

export const AvailableInviteStatus = Object.values(InviteStatusEnum);
