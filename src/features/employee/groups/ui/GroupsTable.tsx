import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { TGroup, TGroupFilter, TGroupsListResponse } from '../model/group.types.ts'
import { getGroupsTableColumns } from './GroupsTableColumns'
import { GroupsTableFilters } from './GroupsTableFilters'
import { PAGE_URLS } from '@/shared/config/page-routes'
import { PERMISSIONS } from '@/shared/config/permissions.ts'
import { useAccess } from '@/features/access/hooks/use-access.ts'
import { TableBase } from '@/shared/components/ui/base/table/TableBase.tsx'
import { TablePaginationBase } from '@/shared/components/ui/base/table/TablePaginationBase.tsx'

interface GroupsTableProps {
    data?: TGroupsListResponse
    isLoading: boolean
    page: number
    perPage: number
    sort: string[]
    filters: TGroupFilter
    onPageChange: (page: number) => void
    onPerPageChange: (perPage: number) => void
    onSortChange: (sort: string[]) => void
    onFiltersChange: (filters: TGroupFilter) => void
    onDelete: (item: TGroup) => void
}

export function GroupsTable({
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
}: GroupsTableProps) {
    const navigate = useNavigate()

    const canView = false//useAccess({ permission: PERMISSIONS.PERMISSION_GROUPS_VIEW }, true)
    const canEdit = useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_EDIT }, true)
    const canDelete = useAccess({ permission: PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_DELETE }, true)

    const handleView = useCallback((item: TGroup) => {
        navigate(PAGE_URLS.employeeGroups.view(item.id))
    }, [navigate]);

    const handleEdit = useCallback((item: TGroup) => {
        navigate(PAGE_URLS.employeeGroups.update(item.id))
    }, [navigate]);

    const handleDelete = useCallback((item: TGroup) => {
        onDelete(item);
    }, [onDelete]);


    const columns = useMemo(
        () =>
            getGroupsTableColumns({
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
            <GroupsTableFilters
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
