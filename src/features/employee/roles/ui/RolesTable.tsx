import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { TRole, TRoleFilter, TRolesListResponse } from '../model/role.types.ts'
import { getRolesTableColumns } from './RolesTableColumns'
import { RolesTableFilters } from './RolesTableFilters'
import { PAGE_URLS } from '@/shared/config/page-routes'
import { PERMISSIONS } from '@/shared/config/permissions.ts'
import { useAccess } from '@/features/access/hooks/use-access.ts'
import { TableBase } from '@/shared/components/ui/base/table/TableBase.tsx'
import { TablePaginationBase } from '@/shared/components/ui/base/table/TablePaginationBase.tsx'

interface RolesTableProps {
    data?: TRolesListResponse
    isLoading: boolean
    page: number
    perPage: number
    sort: string[]
    filters: TRoleFilter
    onPageChange: (page: number) => void
    onPerPageChange: (perPage: number) => void
    onSortChange: (sort: string[]) => void
    onFiltersChange: (filters: TRoleFilter) => void
    onDelete: (item: TRole) => void
}

export function RolesTable({
    data,
    isLoading,
    page,
    perPage,
    sort,
    filters,
    onPageChange,
    onPerPageChange,
    onSortChange,
    onFiltersChange,
    onDelete,
}: RolesTableProps) {
    const navigate = useNavigate()

    const canView = false//useAccess({ permission: PERMISSIONS.PERMISSION_ROLES_VIEW }, true)
    const canEdit = useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_EDIT }, true)
    const canDelete = useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_DELETE }, true)

    const handleView = useCallback((item: TRole) => {
        navigate(PAGE_URLS.employeeRoles.view(item.id))
    }, [navigate]);

    const handleEdit = useCallback((item: TRole) => {
        navigate(PAGE_URLS.employeeRoles.update(item.id))
    }, [navigate]);

    const handleDelete = useCallback((item: TRole) => {
        onDelete(item);
    }, [onDelete]);


    const columns = useMemo(
        () =>
            getRolesTableColumns({
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
            <RolesTableFilters
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
                sort={sort}
                onSortChange={onSortChange}
            />

            <TablePaginationBase
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
