import { api } from '@/shared/api/client.ts'
import { buildTableFilterQueryParams } from '@/shared/helpers/table.helper.ts'
import type {
    TGetRolesRequest,
    TGetRolesResponse,
    TGetRoleRequest,
    TGetRoleResponse,
    TCreateRoleRequestWithoutId,
    TCreateRoleResponse,
    TUpdateRoleRequestWithId,
    TUpdateRoleResponse,
    TDeleteRoleRequest,
    TDeleteRoleResponse,
    TGetRolePermissionsResponse,
} from './roles-api.types.ts'

export const rolesApi = {
    getList: async (params: TGetRolesRequest = {}): Promise<TGetRolesResponse> => {
        const queryString = buildTableFilterQueryParams(params)
        const url = queryString ? `/customers/roles?${queryString}` : '/customers/roles'
        const response = await api.get<TGetRolesResponse>(url)

        return response.data
    },

    getById: async ({ id }: TGetRoleRequest): Promise<TGetRoleResponse> => {
        const response = await api.get<TGetRoleResponse>(`/customers/roles/${id}`)
        return response.data
    },

    create: async (data: TCreateRoleRequestWithoutId): Promise<TCreateRoleResponse> => {
        const response = await api.post<TCreateRoleResponse>('/customers/roles', data)
        return response.data
    },

    update: async ({ id, data }: TUpdateRoleRequestWithId): Promise<TUpdateRoleResponse> => {
        const response = await api.put<TUpdateRoleResponse>(`/customers/roles/${id}`, data)
        return response.data
    },

    delete: async ({ id }: TDeleteRoleRequest): Promise<TDeleteRoleResponse> => {
        await api.delete(`/customers/roles/${id}`)
    },

    getPermissions: async (): Promise<TGetRolePermissionsResponse> => {
        const url = `/customers/roles/permissions`
        const response = await api.get<TGetRolePermissionsResponse>(url)

        return response.data
    },
}
