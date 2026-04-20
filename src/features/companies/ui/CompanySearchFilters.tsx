import { Search } from 'lucide-react'
import { Input } from '@/shadcn/components/ui/input.tsx'
import { Button } from '@/shadcn/components/ui/button.tsx'
import type { CompaniesFilters } from '@/features/companies/model/company.types.ts'

interface CompanySearchFiltersProps {
  filters: CompaniesFilters
  onSearchChange: (search: string) => void
  onReset: () => void
}

export const CompanySearchFilters = ({
  filters,
  onSearchChange,
  onReset,
}: CompanySearchFiltersProps) => {
  const hasActiveFilters = filters.search

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search companies..."
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      {hasActiveFilters && (
        <Button variant="outline" onClick={onReset}>
          Reset filters
        </Button>
      )}
    </div>
  )
}
