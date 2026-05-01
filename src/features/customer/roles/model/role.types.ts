import { z } from 'zod'
import { roleSchema } from './role.schema.ts'
import type {TTableListParams} from "@/shared/helpers/table.helper.ts";


export interface TRolePermission {
    id: number
    code: string
    name: string
    selected: boolean
}

export interface TRolePermissionGroup {
    id: number
    title: string
    permissions: TRolePermission[]
}

export interface TRolePermissionGroups {
    groups: TRolePermissionGroup[]
}

export interface TRole {
    id: number
    title: string
    code: string
    description: string
    immutable: boolean
    createdDate: string
}


export interface TRoleDetail {
    role: TRole
    groups: TRolePermissionGroup[]
}

export type TRoleFormData = z.infer<typeof roleSchema>
/*export interface TRoleFormData {
    title: string
    code: string
    description: string
    //immutable: boolean
    permissionIds: number[]
}*/

export interface TRoleSaveRequest {
    title: string
    code: string
    description: string
    permissionIds: number[]
}
export type TCreateRoleRequest = TRoleSaveRequest //Omit<TRole, 'id'>
export type TUpdateRoleRequest = TRoleSaveRequest //Omit<TRole, 'id'>


export interface TRoleFilter {
    id?: number
    title?: string
    code?: string
    description?: string
    immutable?: boolean
}

export interface TRoleSort {
    field: string
    direction: 'asc' | 'desc'
}

export type TRolesListParams = TTableListParams<TRoleFilter>

export interface TRolesListResponse {
    items: TRole[]
    meta: {
        currentPage: number
        perPage: number
        totalItems: number
        totalPages: number
        sort?: string[]
    }
}
