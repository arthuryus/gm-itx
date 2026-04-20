import { useQuery } from '@tanstack/react-query'
import { companiesApi } from '@/features/companies/api/companies.api.ts'
import { companyQueryKeys } from '@/features/companies/model/company.query-keys.ts'
import type { CompaniesFilters } from '@/features/companies/model/company.types.ts'

export const useCompaniesQuery = (filters: CompaniesFilters) => {
  return useQuery({
    queryKey: companyQueryKeys.list(filters),
    queryFn: () => companiesApi.getCompanies(filters),
  })
}
