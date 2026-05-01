import { api } from '@/shared/api/client.ts'
import { buildTableFilterQueryParams } from '@/shared/helpers/table.helper.ts'
import type {
    TGetCustomersRequest,
    TGetCustomersResponse,
    TGetCustomerRequest,
    TGetCustomerResponse,
    TCreateCustomerRequestWithoutId,
    TCreateCustomerResponse,
    TUpdateCustomerRequestWithId,
    TUpdateCustomerResponse,
    TDeleteCustomerRequest,
    TDeleteCustomerResponse,
    TCloseSessionCustomerRequest,
    TCloseSessionCustomerResponse,
    TSendAccessCustomerRequest,
    TSendAccessCustomerResponse,
} from './customers-api.types.ts'

export const customersApi = {
    getList: async (params: TGetCustomersRequest = {}): Promise<TGetCustomersResponse> => {
        const queryString = buildTableFilterQueryParams(params)
        const url = queryString ? `/customers?${queryString}` : '/customers'
        const response = await api.get<TGetCustomersResponse>(url)

        return response.data
    },

    getById: async ({ id }: TGetCustomerRequest): Promise<TGetCustomerResponse> => {
        const response = await api.get<TGetCustomerResponse>(`/customers/${id}`)
        return response.data
    },

    create: async (data: TCreateCustomerRequestWithoutId): Promise<TCreateCustomerResponse> => {
        const response = await api.post<TCreateCustomerResponse>('/customers', data)
        return response.data
    },

    update: async ({ id, data }: TUpdateCustomerRequestWithId): Promise<TUpdateCustomerResponse> => {
        const response = await api.put<TUpdateCustomerResponse>(`/customers/${id}`, data)
        return response.data
    },

    delete: async ({ id }: TDeleteCustomerRequest): Promise<TDeleteCustomerResponse> => {
        await api.delete(`/customers/${id}`)
    },

    closeSession: async ({ id }: TCloseSessionCustomerRequest): Promise<TCloseSessionCustomerResponse> => {
        await api.put(`/customers/${id}/sessions/close`)
    },

    sendAccess: async ({ id }: TSendAccessCustomerRequest): Promise<TSendAccessCustomerResponse> => {
        await api.put(`/customers/${id}/password`)
    },
}
