import { useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/ui/table.tsx'
import { Skeleton } from '@/shadcn/components/ui/skeleton.tsx'
import { Empty } from '@/shadcn/components/ui/empty.tsx'
import { CompanyStatusBadge } from './CompanyStatusBadge.tsx'
import { CompanyActions } from './CompanyActions.tsx'
import type { Company, CompaniesSortBy, CompaniesSortOrder } from '@/features/companies/model/company.types.ts'
import type { CompaniesFilters } from '@/features/companies/model/company.types.ts'

interface CompaniesTableProps {
  companies: Company[]
  isLoading: boolean
  isError: boolean
  filters: CompaniesFilters
  onSort: (sortBy: CompaniesSortBy) => void
}

export const CompaniesTable = ({
  companies,
  isLoading,
  isError,
  filters,
  onSort,
}: CompaniesTableProps) => {
  const navigate = useNavigate()

  const getSortIndicator = (column: CompaniesSortBy) => {
    if (filters.sortBy !== column) return null
    return filters.sortOrder === 'asc' ? ' ↑' : ' ↓'
  }

  const handleHeaderClick = (column: CompaniesSortBy) => {
    onSort(column)
  }

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                <TableCell><Skeleton className="h-8 w-20" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-md border p-8 text-center">
        <p className="text-destructive">Failed to load companies</p>
      </div>
    )
  }

  if (companies.length === 0) {
    return (
      <Empty
        title="No companies found"
        description="Get started by creating a new company."
      />
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleHeaderClick('id')}
            >
              ID{getSortIndicator('id')}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleHeaderClick('name')}
            >
              Name{getSortIndicator('name')}
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleHeaderClick('status')}
            >
              Status{getSortIndicator('status')}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleHeaderClick('priority')}
            >
              Priority{getSortIndicator('priority')}
            </TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow
              key={company.id}
              className="cursor-pointer"
              onClick={() => navigate(`/companies/${company.id}`)}
            >
              <TableCell>{company.id}</TableCell>
              <TableCell className="font-medium">{company.name}</TableCell>
              <TableCell className="max-w-xs truncate">{company.description}</TableCell>
              <TableCell>
                <CompanyStatusBadge status={company.status} />
              </TableCell>
              <TableCell>{company.priority}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <CompanyActions company={company} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
