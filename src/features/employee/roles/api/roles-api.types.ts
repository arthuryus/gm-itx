import type {
    TRole,
    TRoleDetail,
    TRolesListResponse,
    TRolesListParams,
    TCreateRoleRequest,
    TUpdateRoleRequest,
    TRolePermissionGroups,
} from '../model/role.types.ts'

// List groups
//export interface GetGroupsRequest extends GroupsListParams {}
export type TGetRolesRequest = TRolesListParams
export type TGetRolesResponse = TRolesListResponse

// Get single group
export interface TGetRoleRequest {
    id: number
}
export type TGetRoleResponse = TRoleDetail//TRole

// Create group
export type TCreateRoleRequestWithoutId = TCreateRoleRequest
export type TCreateRoleResponse = TRole

// Update group
export interface TUpdateRoleRequestWithId {
    id: number
    data: TUpdateRoleRequest
}
export type TUpdateRoleResponse = TRole

// Delete group
export interface TDeleteRoleRequest {
    id: number
}
export type TDeleteRoleResponse = void

// Get permissions
export type TGetRolePermissionsResponse = TRolePermissionGroups

