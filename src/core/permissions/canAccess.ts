import type { Role } from "@/core/permissions/roles";

export function canAccess(
  allowedRoles: readonly Role[],
  userRole?: Role
) {
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
}
