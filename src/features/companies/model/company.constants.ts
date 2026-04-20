import type { CompanyStatus } from './company.types.ts'

export const COMPANY_STATUSES: Record<CompanyStatus, CompanyStatus> = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const

export const COMPANY_STATUS_LABELS: Record<CompanyStatus, string> = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
} as const

export const COMPANY_STATUS_VARIANTS: Record<CompanyStatus, 'default' | 'secondary'> = {
  ACTIVE: 'default',
  INACTIVE: 'secondary',
} as const

export const DEFAULT_COMPANY_VALUES = {
  status: 'ACTIVE' as CompanyStatus,
  priority: 0,
} as const

export const COMPANIES_PER_PAGE_OPTIONS = [10, 20, 50, 100] as const

export const DEFAULT_COMPANIES_FILTERS = {
  page: 1,
  perPage: 20,
  search: '',
  sortBy: 'id' as const,
  sortOrder: 'asc' as const,
} as const
