import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { TGroup, TGroupFilter, TGroupsListResponse } from '../model/group.types.ts'
import { getGroupsTableColumns } from './GroupsTableColumns'
import { GroupsTableFilters } from './GroupsTableFilters'
import { PERMISSIONS } from '@/shared/config/permissions.ts'
import { useAccess } from '@/features/access/hooks/use-access.ts'
import { TableBase } from '@/shared/components/ui/base/TableBase.tsx'
import { PaginationBase } from '@/shared/components/ui/base/PaginationBase.tsx'

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
    onDelete: (group: TGroup) => void
}

export function GroupsTable({
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
}: GroupsTableProps) {
    const navigate = useNavigate()

    const canView = false//useAccess({ permission: PERMISSIONS.PERMISSION_GROUPS_VIEW }, true)
    const canEdit = useAccess({ permission: PERMISSIONS.PERMISSION_GROUPS_EDIT }, true)
    const canDelete = useAccess({ permission: PERMISSIONS.PERMISSION_GROUPS_DELETE }, true)

    const handleView = useCallback((group: TGroup) => {
        navigate(`/groups/${group.id}`);
    }, [navigate]);

    const handleEdit = useCallback((group: TGroup) => {
        navigate(`/groups/update/${group.id}`);
    }, [navigate]);

    const handleDelete = useCallback((group: TGroup) => {
        onDelete(group);
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
