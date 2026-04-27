import { api } from '@/shared/api/client.ts'
import type {
    GetGroupsRequest,
    GetGroupsResponse,
    GetGroupRequest,
    GetGroupResponse,
    CreateGroupRequestWithoutId,
    CreateGroupResponse,
    UpdateGroupRequestWithId,
    UpdateGroupResponse,
    DeleteGroupRequest,
    DeleteGroupResponse,
} from './groups-api.types.ts'

function buildQueryParams(params: GetGroupsRequest): string {
    const searchParams = new URLSearchParams()

    if (params.page !== undefined) {
        searchParams.append('page', String(params.page))
    }
    if (params.perPage !== undefined) {
        searchParams.append('perPage', String(params.perPage))
    }

    if (params.sort && params.sort.length > 0) {
        params.sort.forEach((sortItem) => {
            searchParams.append('sort[]', sortItem)
        })
    }

    if (params.filter) {
        Object.entries(params.filter).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                searchParams.append(`${key}`, String(value))//(`filter[${key}]`, String(value))
            }
        })
    }

    return searchParams.toString()
}

export const groupsApi = {
    getList: async (params: GetGroupsRequest = {}): Promise<GetGroupsResponse> => {
        const queryString = buildQueryParams(params)
        const url = queryString ? `/employees/groups?${queryString}` : '/employees/groups'
        const response = await api.get<GetGroupsResponse>(url)

        return response.data
    },

    getById: async ({ id }: GetGroupRequest): Promise<GetGroupResponse> => {
        const response = await api.get<GetGroupResponse>(`/employees/groups/${id}`)
        return response.data
    },

    create: async (data: CreateGroupRequestWithoutId): Promise<CreateGroupResponse> => {
        const response = await api.post<CreateGroupResponse>('/employees/groups', data)
        return response.data
    },

    update: async ({ id, data }: UpdateGroupRequestWithId): Promise<UpdateGroupResponse> => {
        const response = await api.put<UpdateGroupResponse>(`/employees/groups/${id}`, data)
        return response.data
    },

    delete: async ({ id }: DeleteGroupRequest): Promise<DeleteGroupResponse> => {
        await api.delete(`/employees/groups/${id}`)
    },
}
