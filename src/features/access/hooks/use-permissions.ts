import { useAuthStore } from "@/features/auth/store/auth-store.ts"
import type { Role, Permission } from "@/shared/config/permissions.ts"

export function usePermissions() {
  const authorities = useAuthStore((state) => state.authorities)

  const permissions = authorities?.permissions || []
  const roles = authorities?.roles || []

  const hasPermission = (permission: Permission): boolean =>
      permissions.includes(permission)

  const hasPermissionAny = (permissionsList: Permission[]): boolean =>
      permissionsList.some(hasPermission)

  const hasPermissionAll = (permissionsList: Permission[]): boolean =>
      permissionsList.every(hasPermission)

  const hasRole = (role: Role): boolean =>
      roles.includes(role)

  const hasRoleAny = (rolesList: Role[]): boolean =>
      rolesList.some(hasRole)

  const hasRoleAll = (rolesList: Role[]): boolean =>
      rolesList.every(hasRole)

  //const isAdmin = (): boolean => hasRole("Admin")

  return {
    permissions,
    roles,
    hasPermission,
    hasPermissionAny,
    hasPermissionAll,
    hasRole,
    hasRoleAny,
    hasRoleAll,
    //isAdmin,
  }
}

export type UsePermissionsReturn = ReturnType<typeof usePermissions>