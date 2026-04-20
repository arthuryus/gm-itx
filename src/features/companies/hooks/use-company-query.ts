import { useQuery } from '@tanstack/react-query'
import { companiesApi } from '@/features/companies/api/companies.api.ts'
import { companyQueryKeys } from '@/features/companies/model/company.query-keys.ts'

export const useCompanyQuery = (id: number | null) => {
  return useQuery({
    queryKey: companyQueryKeys.detail(id ?? 0),
    queryFn: () => companiesApi.getCompanyById(id!),
    enabled: id !== null,
  })
}
