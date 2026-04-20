import type { CompaniesFilters, CompaniesSortBy, CompaniesSortOrder } from './company.types.ts'
import { DEFAULT_COMPANIES_FILTERS } from './company.constants.ts'

export const parseFiltersFromUrl = (searchParams: URLSearchParams): CompaniesFilters => {
  const page = parseInt(searchParams.get('page') || String(DEFAULT_COMPANIES_FILTERS.page), 10)
  const perPage = parseInt(searchParams.get('perPage') || String(DEFAULT_COMPANIES_FILTERS.perPage), 10)
  const search = searchParams.get('search') || DEFAULT_COMPANIES_FILTERS.search
  const sortBy = (searchParams.get('sortBy') as CompaniesSortBy) || DEFAULT_COMPANIES_FILTERS.sortBy
  const sortOrder = (searchParams.get('sortOrder') as CompaniesSortOrder) || DEFAULT_COMPANIES_FILTERS.sortOrder

  return {
    page: isNaN(page) || page < 1 ? DEFAULT_COMPANIES_FILTERS.page : page,
    perPage: COMPANIES_PER_PAGE_OPTIONS.includes(perPage as typeof COMPANIES_PER_PAGE_OPTIONS[number])
      ? perPage
      : DEFAULT_COMPANIES_FILTERS.perPage,
    search,
    sortBy: ['id', 'name', 'status', 'priority'].includes(sortBy) ? sortBy : DEFAULT_COMPANIES_FILTERS.sortBy,
    sortOrder: ['asc', 'desc'].includes(sortOrder) ? sortOrder : DEFAULT_COMPANIES_FILTERS.sortOrder,
  }
}

export const buildUrlParams = (filters: CompaniesFilters): URLSearchParams => {
  const params = new URLSearchParams()
  params.set('page', String(filters.page))
  params.set('perPage', String(filters.perPage))
  if (filters.search) params.set('search', filters.search)
  params.set('sortBy', filters.sortBy)
  params.set('sortOrder', filters.sortOrder)
  return params
}

import { COMPANIES_PER_PAGE_OPTIONS } from './company.constants.ts'
