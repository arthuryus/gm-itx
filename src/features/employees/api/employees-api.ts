import { api } from '@/shared/api/client.ts'
import type { ListParams, ListResponse } from '@/widgets/crud-table'
import type { Employee, EmployeeFilter, EmployeeFormData } from '../model/employee.types'

function buildQueryParams(params: ListParams<EmployeeFilter>): string {
  const searchParams = new URLSearchParams()

  // Pagination
  if (params.page !== undefined) {
    searchParams.append('page', String(params.page))
  }
  if (params.pageSize !== undefined) {
    searchParams.append('perPage', String(params.pageSize))
  }

  // Sorting
  if (params.sort) {
    const sortValue = params.sort.direction === 'desc' ? `-${String(params.sort.field)}` : String(params.sort.field)
    searchParams.append('sort', sortValue)
  }

  // Filters
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.append(`filter[${key}]`, String(value))
      }
    })
  }

  return searchParams.toString()
}

export const employeesApi = {
  // List with pagination, sorting, and filters
  getList: async (params: ListParams<EmployeeFilter>): Promise<ListResponse<Employee>> => {
    const queryString = buildQueryParams(params)
    const url = queryString ? `/employees?${queryString}` : '/employees'
    
    const response = await api.get<{
      items: Employee[] //data: Employee[]
      meta: {
        currentPage: number
        perPage: number
        totalItems: number
        totalPages: number
        //sort ...
      }
    }>(url)
//console.log('employeesApi response:', response);
    const data = response.data
    return {
      data: data.items,
      total: data.meta.totalItems,
      page: data.meta.currentPage,
      pageSize: data.meta.perPage,
      totalPages: data.meta.totalPages,
    }
    /*return {
      data: response.data,
      total: response.meta.total,
      page: response.meta.currentPage,
      pageSize: response.meta.perPage,
      totalPages: response.meta.totalPages,
    }*/
  },

  // Get single employee by ID
  getById: async (id: number): Promise<Employee> => {
    const response = await api.get<{ data: Employee }>(`/employees/${id}`)
    return response.data
  },

  // Create new employee
  create: async (data: EmployeeFormData): Promise<Employee> => {
    const response = await api.post<{ data: Employee }>('/employees', data)
    return response.data
  },

  // Update employee
  update: async (id: number, data: EmployeeFormData): Promise<Employee> => {
    const response = await api.put<{ data: Employee }>(`/employees/${id}`, data)
    return response.data
  },

  // Delete employee
  delete: async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`)
  },
}
