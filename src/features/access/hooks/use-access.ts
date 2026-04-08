import { usePermissions } from "@/features/access/hooks/use-permissions.ts"
import type { Role, Permission } from "@/shared/config/permissions.ts"

export interface AccessProps {
    permission?: Permission
    permissions?: Permission[]
    requireAll?: boolean
    role?: Role
    roles?: Role[]
    requireAllRoles?: boolean
}

export function useAccess({
  permission,
  permissions,
  requireAll = false,
  role,
  roles,
  requireAllRoles = false,
}: AccessProps, enabled: boolean = true) {
    const {
        hasPermission,
        hasPermissionAny,
        hasPermissionAll,
        hasRole,
        hasRoleAny,
        hasRoleAll,
    } = usePermissions()

    if (!enabled) return true

    // permission (single)
    if (permission && !hasPermission(permission)) return false

    // permissions (multiple)
    if (permissions?.length) {
        const ok = requireAll
            ? hasPermissionAll(permissions)
            : hasPermissionAny(permissions)

        if (!ok) return false
    }

    // role (single)
    if (role && !hasRole(role)) return false

    // roles (multiple)
    if (roles?.length) {
        const ok = requireAllRoles
            ? hasRoleAll(roles)
            : hasRoleAny(roles)

        if (!ok) return false
    }

    return true
}