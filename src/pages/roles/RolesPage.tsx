import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { TRole, TRoleFilter } from '@/features/roles/model/role.types.ts'
import { DEFAULT_PER_PAGE } from '@/shared/constants/main.ts'
import { PAGE_URLS } from '@/shared/config/page-routes'
import { useGetRoles } from '@/features/roles/hooks/queries/useGetRoles.ts'
import { useDeleteRole } from '@/features/roles/hooks/mutations/useDeleteRole'
import { PERMISSIONS } from '@/shared/config/permissions.ts'
import { useAccess } from '@/features/access/hooks/use-access.ts'
import { RolesTable } from '@/features/roles/ui/RolesTable'
import { DeleteDialogBase } from '@/shared/components/ui/base/DeleteDialogBase'
import { Button } from '@/shadcn/components/ui/button'
import { Plus } from 'lucide-react'

export default function RolesPage() {
    const canCreate = useAccess({ permission: PERMISSIONS.PERMISSION_ROLES_CREATE }, true)

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE)
    const [sort, setSort] = useState<string[]>([])
    const [filters, setFilters] = useState<TRoleFilter>({})
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [itemToDelete, setItemToDelete] = useState<TRole | null>(null)

    const { data, isLoading } = useGetRoles({page, perPage, sort, filter: filters })

    const deleteMutation = useDeleteRole()

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

    const handleFiltersChange = useCallback((newFilters: TRoleFilter) => {
        setFilters(newFilters)
        setPage(1)
    }, [])

    const handleDeleteClick = useCallback((item: TRole) => {
        setItemToDelete(item)
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
                <h1 className="text-2xl font-bold">Роли</h1>
                {canCreate && (
                    <Button asChild>
                        <Link to={PAGE_URLS.employeeRoles.create()}>
                            <Plus className="h-4 w-4" />
                            Добавить
                        </Link>
                    </Button>
                )}
            </div>

            <RolesTable
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
