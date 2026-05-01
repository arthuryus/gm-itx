import { api } from '@/shared/api/client.ts'
import { buildTableFilterQueryParams } from '@/shared/helpers/table.helper.ts'
import type {
    TGetEmployeesRequest,
    TGetEmployeesResponse,
    TGetEmployeeRequest,
    TGetEmployeeResponse,
    TCreateEmployeeRequestWithoutId,
    TCreateEmployeeResponse,
    TUpdateEmployeeRequestWithId,
    TUpdateEmployeeResponse,
    TDeleteEmployeeRequest,
    TDeleteEmployeeResponse,
    TCloseSessionEmployeeRequest,
    TCloseSessionEmployeeResponse,
    TSendAccessEmployeeRequest,
    TSendAccessEmployeeResponse,
} from './employees-api.types.ts'

export const employeesApi = {
    getList: async (params: TGetEmployeesRequest = {}): Promise<TGetEmployeesResponse> => {
        const queryString = buildTableFilterQueryParams(params)
        const url = queryString ? `/employees?${queryString}` : '/employees'
        const response = await api.get<TGetEmployeesResponse>(url)

        return response.data
    },

    getById: async ({ id }: TGetEmployeeRequest): Promise<TGetEmployeeResponse> => {
        const response = await api.get<TGetEmployeeResponse>(`/employees/${id}`)
        return response.data
    },

    create: async (data: TCreateEmployeeRequestWithoutId): Promise<TCreateEmployeeResponse> => {
        const response = await api.post<TCreateEmployeeResponse>('/employees', data)
        return response.data
    },

    update: async ({ id, data }: TUpdateEmployeeRequestWithId): Promise<TUpdateEmployeeResponse> => {
        const response = await api.put<TUpdateEmployeeResponse>(`/employees/${id}`, data)
        return response.data
    },

    delete: async ({ id }: TDeleteEmployeeRequest): Promise<TDeleteEmployeeResponse> => {
        await api.delete(`/employees/${id}`)
    },

    closeSession: async ({ id }: TCloseSessionEmployeeRequest): Promise<TCloseSessionEmployeeResponse> => {
        await api.put(`/employees/${id}/sessions/close`)
    },

    sendAccess: async ({ id }: TSendAccessEmployeeRequest): Promise<TSendAccessEmployeeResponse> => {
        await api.put(`/employees/${id}/password`)
    },
}
