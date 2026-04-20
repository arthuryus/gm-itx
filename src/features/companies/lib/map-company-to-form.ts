import type { Company, CompanyFormValues } from '@/features/companies/model/company.types.ts'

export const mapCompanyToFormValues = (company: Company): CompanyFormValues => ({
  name: company.name,
  description: company.description,
  status: company.status,
  priority: company.priority,
})
