import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { companiesApi } from '@/features/companies/api/companies.api.ts'
import { companyQueryKeys } from '@/features/companies/model/company.query-keys.ts'
import type { CreateCompanyDto } from '@/features/companies/model/company.types.ts'

export const useCreateCompanyMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreateCompanyDto) => companiesApi.createCompany(data),
    onSuccess: (company) => {
      toast.success('Company created successfully')
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.lists() })
      navigate(`/companies/${company.id}`)
    },
    onError: () => {
      toast.error('Failed to create company')
    },
  })
}
