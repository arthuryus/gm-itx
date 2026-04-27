import type { TGroup, TGroupsListResponse, TGroupsListParams, TCreateGroupRequest, TUpdateGroupRequest } from '../model/group.types.ts'

// List groups
//export interface GetGroupsRequest extends GroupsListParams {}
export type TGetGroupsRequest = TGroupsListParams
export type TGetGroupsResponse = TGroupsListResponse

// Get single group
export interface TGetGroupRequest {
    id: number
}
export type TGetGroupResponse = TGroup

// Create group
export type TCreateGroupRequestWithoutId = TCreateGroupRequest
export type TCreateGroupResponse = TGroup

// Update group
export interface TUpdateGroupRequestWithId {
    id: number
    data: TUpdateGroupRequest
}
export type UpdateGroupResponse = TGroup

// Delete group
export interface TDeleteGroupRequest {
    id: number
}
export type TDeleteGroupResponse = void
