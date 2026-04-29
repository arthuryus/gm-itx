import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { TEmployee, TEmployeeFilter } from '@/features/employees/model/employee.types.ts'
import { DEFAULT_PER_PAGE } from '@/shared/constants/main.ts'
import { PAGE_URLS } from '@/shared/config/page-routes'
import { useGetEmployees } from '@/features/employees/hooks/queries/useGetEmployees.ts'
import { useDeleteEmployee } from '@/features/employees/hooks/mutations/useDeleteEmployee'
import { PERMISSIONS } from '@/shared/config/permissions.ts'
import { useAccess } from '@/features/access/hooks/use-access.ts'
import { EmployeesTable } from '@/features/employees/ui/EmployeesTable'
import { DeleteDialogBase } from '@/shared/components/ui/base/DeleteDialogBase'
import { Button } from '@/shadcn/components/ui/button'
import { Plus } from 'lucide-react'

export default function EmployeesPage() {
    const canCreate = useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEES_CREATE }, true)

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE)
    const [sort, setSort] = useState<string[]>([])
    const [filters, setFilters] = useState<TEmployeeFilter>({})
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [itemToDelete, setItemToDelete] = useState<TEmployee | null>(null)

    const { data, isLoading } = useGetEmployees({page, perPage, sort, filter: filters })

    const deleteMutation = useDeleteEmployee()

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
                <h1 className="text-2xl font-bold">Сотрудники</h1>
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
                sort={sort}
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
