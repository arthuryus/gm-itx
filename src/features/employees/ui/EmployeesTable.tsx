import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { TEmployee, TEmployeeFilter, TEmployeesListResponse } from '../model/employee.types.ts'
import { getEmployeesTableColumns } from './EmployeesTableColumns'
import { EmployeesTableFilters } from './EmployeesTableFilters'
import { PERMISSIONS } from '@/shared/config/permissions.ts'
import { useAccess } from '@/features/access/hooks/use-access.ts'
import { TableBase } from '@/shared/components/ui/base/TableBase.tsx'
import { PaginationBase } from '@/shared/components/ui/base/PaginationBase.tsx'

interface EmployeesTableProps {
    data?: TEmployeesListResponse
    isLoading: boolean
    page: number
    perPage: number
    sort: string[]
    filters: TEmployeeFilter
    onPageChange: (page: number) => void
    onPerPageChange: (perPage: number) => void
    onSortChange: (sort: string[]) => void
    onFiltersChange: (filters: TEmployeeFilter) => void
    onDelete: (item: TEmployee) => void
}

export function EmployeesTable({
    data,
    isLoading,
    page,
    perPage,
    //sort,
    filters,
    onPageChange,
    onPerPageChange,
    onSortChange,
    onFiltersChange,
    onDelete,
}: EmployeesTableProps) {
    const navigate = useNavigate()

    const canView = false//useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEES_VIEW }, true)
    const canEdit = useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEES_EDIT }, true)
    const canDelete = useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEES_DELETE }, true)

    const handleView = useCallback((item: TEmployee) => {
        navigate(`/employees/${item.id}`);
    }, [navigate]);

    const handleEdit = useCallback((item: TEmployee) => {
        navigate(`/employees/update/${item.id}`);
    }, [navigate]);

    const handleDelete = useCallback((item: TEmployee) => {
        onDelete(item);
    }, [onDelete]);


    const columns = useMemo(
        () =>
            getEmployeesTableColumns({
                onView: handleView,
                onEdit: handleEdit,
                onDelete: handleDelete,
                canView: canView ?? false,
                canEdit: canEdit ?? false,
                canDelete: canDelete ?? false,
            }),
        [canView, canEdit, canDelete, handleView, handleEdit, handleDelete]
    )

    const tableData = useMemo(() => data?.items ?? [], [data])
    const totalPages = data?.meta?.totalPages ?? 0
    const totalItems = data?.meta?.totalItems ?? 0

    return (
        <div className="space-y-4">
            <EmployeesTableFilters
                filters={filters}
                onFiltersChange={onFiltersChange}
            />

            <TableBase
                isLoading={isLoading}
                tableData={tableData}
                columns={columns}
                page={page}
                perPage={perPage}
                totalPages={totalPages}
                onSortChange={onSortChange}
            />

            <PaginationBase
                page={page}
                perPage={perPage}
                totalItems={totalItems}
                totalPages={totalPages}
                onPageChange={onPageChange}
                onPerPageChange={onPerPageChange}
            />
        </div>
    )
}
