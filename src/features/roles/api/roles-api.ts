import { api } from '@/shared/api/client.ts'
import { buildTableFilterQueryParams } from '@/shared/helpers/table.helper.ts'
/*import type {
    GetGroupsRequest,
    GetGroupsResponse,
    GetGroupRequest,
    GetGroupResponse,
    CreateGroupRequestWithoutId,//CreateGroupPayload,
    CreateGroupResponse,
    UpdateGroupRequestWithId,
    UpdateGroupResponse,
    DeleteGroupRequest,
    DeleteGroupResponse,
} from './roles-api.types.ts'*/

export const rolesApi = {
    getList: async (params: GetGroupsRequest = {}): Promise<GetGroupsResponse> => {
        const queryString = buildTableFilterQueryParams(params)
        const url = queryString ? `/employees/roles?${queryString}` : '/employees/roles'
        const response = await api.get<GetGroupsResponse>(url)

        return response.data
    },

    getById: async ({ id }: GetGroupRequest): Promise<GetGroupResponse> => {
        const response = await api.get<GetGroupResponse>(`/employees/roles/${id}`)
        return response.data
    },

    create: async (data: CreateGroupRequestWithoutId): Promise<CreateGroupResponse> => {
        const response = await api.post<CreateGroupResponse>('/employees/roles', data)
        return response.data
    },

    update: async ({ id, data }: UpdateGroupRequestWithId): Promise<UpdateGroupResponse> => {
        const response = await api.put<UpdateGroupResponse>(`/employees/roles/${id}`, data)
        return response.data
    },

    delete: async ({ id }: DeleteGroupRequest): Promise<DeleteGroupResponse> => {
        await api.delete(`/employees/roles/${id}`)
    },

    getPermissions: async (params: GetGroupsRequest = {}): Promise<GetGroupsResponse> => {
        const url = `/employees/roles/permissions`
        const response = await api.get<GetGroupsResponse>(url)

        return response.data
    },
}
