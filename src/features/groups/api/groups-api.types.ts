import type { TGroup, TGroupsListResponse, TGroupsListParams, TCreateGroupRequest, TUpdateGroupRequest } from '../model/group.types.ts'

// List groups
//export interface GetGroupsRequest extends GroupsListParams {}
export type GetGroupsRequest = TGroupsListParams
export type GetGroupsResponse = TGroupsListResponse

// Get single group
export interface GetGroupRequest {
    id: number
}
export type GetGroupResponse = TGroup

// Create group
export type CreateGroupRequestWithoutId = TCreateGroupRequest
export type CreateGroupResponse = TGroup

// Update group
export interface UpdateGroupRequestWithId {
    id: number
    data: TUpdateGroupRequest
}
export type UpdateGroupResponse = TGroup

// Delete group
export interface DeleteGroupRequest {
    id: number
}
export type DeleteGroupResponse = void
