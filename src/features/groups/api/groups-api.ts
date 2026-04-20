import { api } from '@/shared/api/client.ts'
import type {
    GetGroupsRequest,
    GetGroupsResponse,
    GetGroupRequest,
    GetGroupResponse,
    CreateGroupPayload,
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
    getGroups: async (params: GetGroupsRequest = {}): Promise<GetGroupsResponse> => {
        const queryString = buildQueryParams(params)
        const url = queryString ? `/employees/groups?${queryString}` : '/employees/groups'
        const response = await api.get<GetGroupsResponse>(url)

        return response.data
        /*return {
            "items": [
                {id: 1, name: 'Group 1', description: 'Desc 1', status: 'ACTIVE', priority: 1},
                {id: 2, name: 'Group 2', description: 'Desc 2', status: 'INACTIVE', priority: 2},
            ],
            "meta": {
                "currentPage": 1,
                "perPage": 20,
                "totalItems": 2,
                "totalPages": 1,
                /*"sort": [
                    "-priority",
                    "name",
                    "id"
                ]* /
            }
        }*/
    },

    getGroup: async ({ id }: GetGroupRequest): Promise<GetGroupResponse> => {
        const response = await api.get<GetGroupResponse>(`/employees/groups/${id}`)
        return response.data
    },

    createGroup: async (payload: CreateGroupPayload): Promise<CreateGroupResponse> => {
        const response = await api.post<CreateGroupResponse>('/employees/groups', payload)
        return response.data
    },

    updateGroup: async ({ id, data }: UpdateGroupRequestWithId): Promise<UpdateGroupResponse> => {
        const response = await api.put<UpdateGroupResponse>(`/employees/groups/${id}`, data)
        return response.data
    },

    deleteGroup: async ({ id }: DeleteGroupRequest): Promise<DeleteGroupResponse> => {
        await api.delete(`/employees/groups/${id}`)
    },
}
