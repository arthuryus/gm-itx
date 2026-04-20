import { Badge } from '@/shadcn/components/ui/badge.tsx'
import { COMPANY_STATUS_LABELS, COMPANY_STATUS_VARIANTS } from '@/features/companies/model/company.constants.ts'
import type { CompanyStatus } from '@/features/companies/model/company.types.ts'

interface CompanyStatusBadgeProps {
  status: CompanyStatus
}

export const CompanyStatusBadge = ({ status }: CompanyStatusBadgeProps) => {
  return (
    <Badge variant={COMPANY_STATUS_VARIANTS[status]}>
      {COMPANY_STATUS_LABELS[status]}
    </Badge>
  )
}
