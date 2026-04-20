import type {
    Group,
    GroupsListResponse,
    GroupsListParams,
    CreateGroupRequest,
    UpdateGroupRequest,
} from '@/features/groups/model/group.types.ts'

// List groups
export interface GetGroupsRequest extends GroupsListParams {}
export type GetGroupsResponse = GroupsListResponse

// Get single group
export interface GetGroupRequest {
    id: number
}
export type GetGroupResponse = Group

// Create group
export type CreateGroupPayload = CreateGroupRequest
export type CreateGroupResponse = Group

// Update group
export interface UpdateGroupRequestWithId {
    id: number
    data: UpdateGroupRequest
}
export type UpdateGroupResponse = Group

// Delete group
export interface DeleteGroupRequest {
    id: number
}
export type DeleteGroupResponse = void
