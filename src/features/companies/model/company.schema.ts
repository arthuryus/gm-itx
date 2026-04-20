import { z } from 'zod'
import type { CompanyFormValues } from './company.types.ts'

export const companySchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  description: z.string().min(1, 'Description is required').trim(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  priority: z.coerce.number().int().min(0, 'Priority must be 0 or greater'),
})

export type CompanySchema = z.infer<typeof companySchema>

export const getDefaultCompanyFormValues = (): CompanyFormValues => ({
  name: '',
  description: '',
  status: 'ACTIVE',
  priority: 0,
})
