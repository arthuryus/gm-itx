export type CompanyStatus = 'ACTIVE' | 'INACTIVE'

export type Company = {
  id: number
  name: string
  description: string
  status: CompanyStatus
  priority: number
}

export type CreateCompanyDto = {
  name: string
  description: string
  status: CompanyStatus
  priority: number
}

export type UpdateCompanyDto = CreateCompanyDto

export type CompanyFormValues = {
  name: string
  description: string
  status: CompanyStatus
  priority: number
}

export type CompaniesSortBy = 'id' | 'name' | 'status' | 'priority'
export type CompaniesSortOrder = 'asc' | 'desc'

export type CompaniesFilters = {
  page: number
  perPage: number
  search: string
  sortBy: CompaniesSortBy
  sortOrder: CompaniesSortOrder
}

export type CompaniesListResponse = {
  data: Company[]
  meta: {
    currentPage: number
    perPage: number
    total: number
    totalPages: number
  }
}
