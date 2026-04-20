import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button'
import { GroupsTable } from '@/features/groups/ui/GroupsTable'
import { GroupDeleteDialog } from '@/features/groups/ui/GroupDeleteDialog'
import { useGroups } from '@/features/groups/hooks/queries/useGroups'
import { useDeleteGroup } from '@/features/groups/hooks/mutations/useDeleteGroup'
import type { Group, GroupFilter } from '@/features/groups/model/group.types.ts'
import { PERMISSIONS } from '@/shared/config/permissions.ts'
import { useAccess } from '@/features/access/hooks/use-access.ts'
import { DEFAULT_PER_PAGE } from '@/features/groups/lib/constants.ts'

export default function GroupsPage() {
    const canCreate = useAccess({ permission: PERMISSIONS.PERMISSION_GROUPS_CREATE }, true)

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE)
    const [sort, setSort] = useState<string[]>([])
    const [filters, setFilters] = useState<GroupFilter>({})
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [groupToDelete, setGroupToDelete] = useState<Group | null>(null)

    const { data, isLoading, error } = useGroups({
        page,
        perPage,
        sort,
        filter: filters,
    })

    const deleteGroupMutation = useDeleteGroup()

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

    const handleFiltersChange = useCallback((newFilters: GroupFilter) => {
        setFilters(newFilters)
        setPage(1)
    }, [])

    const handleDeleteClick = useCallback((group: Group) => {
        setGroupToDelete(group)
        setDeleteDialogOpen(true)
    }, [])

    const handleDeleteConfirm = useCallback(() => {
        if (groupToDelete) {
            deleteGroupMutation.mutate(
                { id: groupToDelete.id },
                {
                    onSuccess: () => {
                        setDeleteDialogOpen(false)
                        setGroupToDelete(null)
                    },
                }
            )
        }
    }, [groupToDelete, deleteGroupMutation])

    const handleDeleteClose = useCallback(() => {
        setDeleteDialogOpen(false)
        setGroupToDelete(null)
    }, [])

    if (error) {
        return (
            <div className="p-6">
                <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
                    Ошибка загрузки: {error.message}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Группы</h1>
                {canCreate && (
                    <Button asChild>
                        <Link to="/groups/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Создать
                        </Link>
                    </Button>
                )}
            </div>

            <GroupsTable
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

            <GroupDeleteDialog
                group={groupToDelete}
                isOpen={deleteDialogOpen}
                onClose={handleDeleteClose}
                onConfirm={handleDeleteConfirm}
                isLoading={deleteGroupMutation.isPending}
            />
        </div>
    )
}
