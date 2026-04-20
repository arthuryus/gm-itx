import type { CompaniesFilters } from './company.types.ts'

export const companyQueryKeys = {
  all: ['companies'] as const,
  lists: () => [...companyQueryKeys.all, 'list'] as const,
  list: (filters: CompaniesFilters) => [...companyQueryKeys.lists(), filters] as const,
  details: () => [...companyQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...companyQueryKeys.details(), id] as const,
}
