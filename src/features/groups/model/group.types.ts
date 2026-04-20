export type GroupStatus = 'ACTIVE' | 'INACTIVE'

export interface Group {
    id: number
    name: string
    description: string
    status: GroupStatus
    priority: number
}

export interface GroupFilter {
    id?: number
    name?: string
    description?: string
    status?: GroupStatus
    priority?: number
}

export interface GroupSort {
    field: string
    direction: 'asc' | 'desc'
}

export interface GroupsListParams {
    page?: number
    perPage?: number
    sort?: string[]
    filter?: GroupFilter
}

export interface GroupsListResponse {
    items: Group[]
    meta: {
        currentPage: number
        perPage: number
        totalItems: number
        totalPages: number
        sort?: string[]
    }
}

export interface GroupFormData {
    name: string
    description: string
    status: GroupStatus
    priority: number
}

export type CreateGroupRequest = Omit<Group, 'id'>
export type UpdateGroupRequest = Omit<Group, 'id'>
