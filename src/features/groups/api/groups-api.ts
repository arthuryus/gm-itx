import { api } from '@/shared/api/client.ts'
import { buildTableFilterQueryParams } from '@/shared/helpers/table.helper.ts'
import type {
    TGetGroupsRequest,
    TGetGroupsResponse,
    TGetGroupRequest,
    TGetGroupResponse,
    TCreateGroupRequestWithoutId,
    TCreateGroupResponse,
    TUpdateGroupRequestWithId,
    UpdateGroupResponse,
    TDeleteGroupRequest,
    TDeleteGroupResponse,
} from './groups-api.types.ts'

export const groupsApi = {
    getList: async (params: TGetGroupsRequest = {}): Promise<TGetGroupsResponse> => {
        const queryString = buildTableFilterQueryParams(params)
        const url = queryString ? `/employees/groups?${queryString}` : '/employees/groups'
        const response = await api.get<TGetGroupsResponse>(url)

        return response.data
    },

    getById: async ({ id }: TGetGroupRequest): Promise<TGetGroupResponse> => {
        const response = await api.get<TGetGroupResponse>(`/employees/groups/${id}`)
        return response.data
    },

    create: async (data: TCreateGroupRequestWithoutId): Promise<TCreateGroupResponse> => {
        const response = await api.post<TCreateGroupResponse>('/employees/groups', data)
        return response.data
    },

    update: async ({ id, data }: TUpdateGroupRequestWithId): Promise<UpdateGroupResponse> => {
        const response = await api.put<UpdateGroupResponse>(`/employees/groups/${id}`, data)
        return response.data
    },

    delete: async ({ id }: TDeleteGroupRequest): Promise<TDeleteGroupResponse> => {
        await api.delete(`/employees/groups/${id}`)
    },
}
