import type { TRoleDetail, TRolePermissionGroups, TRoleFormData, TRoleSaveRequest } from "./role.types.ts";
import { roleDefaultValues } from "./role.schema.ts";


export function mapRoleApiToDefaultValues(data?: TRolePermissionGroups): TRoleDetail {
    return {
        role: {
            title: roleDefaultValues.title,
            code: roleDefaultValues.code,
            description: roleDefaultValues.description,
            immutable: roleDefaultValues.immutable,
        },
        groups: data?.groups ?? [],
    }
}

export function mapRoleApiToForm(data: TRoleDetail): TRoleFormData {
    return {
        title: data.role.title,
        code: data.role.code,
        description: data.role.description,
        immutable: data.role.immutable,
        groups: data.groups,
    }
}

export function mapRoleFormToApi(data: TRoleFormData): TRoleSaveRequest {
    return {
        title: data.title,
        code: data.code,
        description: data.description,
        permissionIds: data.groups.flatMap((group) =>
            group.permissions
                .filter((permission) => permission.selected)
                .map((permission) => permission.id)
        ),
    }
}

/*export function mapRoleApiToForm(data: TRoleDetailResponse): TRoleFormData {
    return {
        title: data.role.title,
        code: data.role.code,
        description: data.role.description,
        permissionIds: data.groups.flatMap((group) =>
            group.permissions
                .filter((permission) => permission.selected)
                .map((permission) => permission.id)
        ),
    }
}

export function mapRoleFormToApi(data: TRoleFormData): TRoleSaveRequest {
    return {
        title: data.title,
        code: data.code,
        description: data.description,
        permissionIds: data.permissionIds,
    }
}*/