import { api } from '@/shared/api/client.ts'
import type {
  Company,
  CompaniesFilters,
  CompaniesListResponse,
  CreateCompanyDto,
  UpdateCompanyDto,
} from '@/features/companies/model/company.types.ts'

export const companiesApi = {
  getCompanies: async (params: CompaniesFilters): Promise<CompaniesListResponse> => {
    const response = await api.get('/companies', {
      params: {
        page: params.page,
        perPage: params.perPage,
        search: params.search || undefined,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
      },
    })
    return response.data
  },

  getCompanyById: async (id: number): Promise<Company> => {
    const response = await api.get(`/companies/${id}`)
    return response.data
  },

  createCompany: async (data: CreateCompanyDto): Promise<Company> => {
    const response = await api.post('/companies', data)
    return response.data
  },

  updateCompany: async (id: number, data: UpdateCompanyDto): Promise<Company> => {
    const response = await api.put(`/companies/${id}`, data)
    return response.data
  },

  deleteCompany: async (id: number): Promise<void> => {
    await api.delete(`/companies/${id}`)
  },
}
