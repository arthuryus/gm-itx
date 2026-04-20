import { useNavigate, useSearchParams } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button.tsx'
import { useMetadata } from '@/shared/hooks/use-metadata.ts'
import { useCompaniesQuery } from '@/features/companies/hooks/use-companies-query.ts'
import { CompaniesTable } from '@/features/companies/ui/CompaniesTable.tsx'
import { CompanySearchFilters } from '@/features/companies/ui/CompanySearchFilters.tsx'
import { CompanyPagination } from '@/features/companies/ui/CompanyPagination.tsx'
import { parseFiltersFromUrl, buildUrlParams } from '@/features/companies/model/company.filters.ts'
import { DEFAULT_COMPANIES_FILTERS } from '@/features/companies/model/company.constants.ts'
import type { CompaniesSortBy } from '@/features/companies/model/company.types.ts'
import { PERMISSIONS } from '@/shared/config/permissions.ts'
import { usePermissions } from '@/features/access/hooks/use-permissions.ts'

export default function CompaniesPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const h1 = useMetadata().h1
  const { hasPermission } = usePermissions()

  const filters = parseFiltersFromUrl(searchParams)
  const { data, isLoading, isError } = useCompaniesQuery(filters)

  const canCreate = hasPermission(PERMISSIONS.PERMISSION_COMPANIES_CREATE)

  const updateFilters = (updates: Partial<typeof filters>) => {
    const newFilters = { ...filters, ...updates }
    setSearchParams(buildUrlParams(newFilters))
  }

  const handleSort = (sortBy: CompaniesSortBy) => {
    const sortOrder =
      filters.sortBy === sortBy && filters.sortOrder === 'asc' ? 'desc' : 'asc'
    updateFilters({ sortBy, sortOrder, page: 1 })
  }

  const handleSearchChange = (search: string) => {
    updateFilters({ search, page: 1 })
  }

  const handleReset = () => {
    setSearchParams(buildUrlParams(DEFAULT_COMPANIES_FILTERS))
  }

  const handlePageChange = (page: number) => {
    updateFilters({ page })
  }

  const handlePerPageChange = (perPage: number) => {
    updateFilters({ perPage, page: 1 })
  }

  const companies = data?.data ?? []
  const meta = data?.meta ?? {
    currentPage: 1,
    perPage: 20,
    total: 0,
    totalPages: 1,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{h1}</h1>
          <p className="text-muted-foreground">
            Manage your companies and their settings.
          </p>
        </div>
        {canCreate && (
          <Button onClick={() => navigate('/companies/create')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Company
          </Button>
        )}
      </div>

      <CompanySearchFilters
        filters={filters}
        onSearchChange={handleSearchChange}
        onReset={handleReset}
      />

      <CompaniesTable
        companies={companies}
        isLoading={isLoading}
        isError={isError}
        filters={filters}
        onSort={handleSort}
      />

      {meta.totalPages > 1 && (
        <CompanyPagination
          currentPage={meta.currentPage}
          totalPages={meta.totalPages}
          perPage={meta.perPage}
          total={meta.total}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        />
      )}
    </div>
  )
}