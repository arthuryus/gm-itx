import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { companiesApi } from '@/features/companies/api/companies.api.ts'
import { companyQueryKeys } from '@/features/companies/model/company.query-keys.ts'

export const useDeleteCompanyMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (id: number) => companiesApi.deleteCompany(id),
    onSuccess: () => {
      toast.success('Company deleted successfully')
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.lists() })
      navigate('/companies')
    },
    onError: () => {
      toast.error('Failed to delete company')
    },
  })
}
