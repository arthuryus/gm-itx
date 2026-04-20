import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { companiesApi } from '@/features/companies/api/companies.api.ts'
import { companyQueryKeys } from '@/features/companies/model/company.query-keys.ts'
import type { UpdateCompanyDto } from '@/features/companies/model/company.types.ts'

export const useUpdateCompanyMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCompanyDto }) =>
      companiesApi.updateCompany(id, data),
    onSuccess: (company) => {
      toast.success('Company updated successfully')
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.detail(company.id) })
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.lists() })
      navigate(`/companies/${company.id}`)
    },
    onError: () => {
      toast.error('Failed to update company')
    },
  })
}
