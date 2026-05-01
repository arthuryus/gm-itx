import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useMetadata } from "@/shared/config/metadata.ts"
import type { TEmployee, TEmployeeFilter } from '@/features/employee/employees/model/employee.types.ts'
import { DEFAULT_PER_PAGE } from '@/shared/constants/main.ts'
import { PAGE_URLS } from '@/shared/config/page-routes.ts'
import { useGetEmployees } from '@/features/employee/employees/hooks/queries/useGetEmployees.ts'
import { useDeleteEmployee } from '@/features/employee/employees/hooks/mutations/useDeleteEmployee.ts'
import { PERMISSIONS } from '@/shared/config/permissions.ts'
import { useAccess } from '@/features/access/hooks/use-access.ts'
import { EmployeesTable } from '@/features/employee/employees/ui/EmployeesTable.tsx'
import { DeleteDialogBase } from '@/shared/components/ui/base/DeleteDialogBase.tsx'
import { Button } from '@/shadcn/components/ui/button.tsx'
import { Plus } from 'lucide-react'

export default function EmployeesPage() {
    const { h1 } = useMetadata()
    const canCreate = useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEES_CREATE }, true)

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE)
    const [sort, setSort] = useState<string[] | undefined>(undefined)
    const [filters, setFilters] = useState<TEmployeeFilter>({})
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [itemToDelete, setItemToDelete] = useState<TEmployee | null>(null)

    const { data, isLoading } = useGetEmployees({page, perPage, sort, filter: filters })
    const deleteMutation = useDeleteEmployee()

    const effectiveSort = sort ?? data?.meta.sort ?? []

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage)
    }, [])

    const handlePerPageChange = useCallback((newPerPage: number) => {
        setPerPage(newPerPage)
        setPage(1)
    }, [])

    const handleSortChange = useCallback((newSort: string[]) => {
        setSort(newSort)
        setPage(1)
    }, [])

    const handleFiltersChange = useCallback((newFilters: TEmployeeFilter) => {
        setFilters(newFilters)
        setPage(1)
    }, [])

    const handleDeleteClick = useCallback((employee: TEmployee) => {
        setItemToDelete(employee)
        setDeleteDialogOpen(true)
    }, [])

    const handleDeleteConfirm = useCallback(() => {
        if (itemToDelete) {
            deleteMutation.mutate(
                { id: itemToDelete.id },
                {
                    onSuccess: () => {
                        setDeleteDialogOpen(false)
                        setItemToDelete(null)
                    },
                }
            )
        }
    }, [itemToDelete, deleteMutation])

    const handleDeleteClose = useCallback(() => {
        setDeleteDialogOpen(false)
        setItemToDelete(null)
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{h1}</h1>
                {canCreate && (
                    <Button asChild>
                        <Link to={PAGE_URLS.employees.create()}>
                            <Plus className="h-4 w-4" />
                            Добавить
                        </Link>
                    </Button>
                )}
            </div>

            <EmployeesTable
                data={data}
                isLoading={isLoading}
                page={page}
                perPage={perPage}
                sort={effectiveSort}
                filters={filters}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
                onSortChange={handleSortChange}
                onFiltersChange={handleFiltersChange}
                onDelete={handleDeleteClick}
            />

            <DeleteDialogBase
                isOpen={deleteDialogOpen}
                onClose={handleDeleteClose}
                onConfirm={handleDeleteConfirm}
                isLoading={deleteMutation.isPending}
            />
        </div>
    )
}
