import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { TCustomer, TCustomerFilter, TCustomersListResponse } from '../model/customer.types.ts'
import { getCustomersTableColumns } from './CustomersTableColumns.tsx'
import { CustomersTableFilters } from './CustomersTableFilters.tsx'
import { PAGE_URLS } from '@/shared/config/page-routes'
import { PERMISSIONS } from '@/shared/config/permissions.ts'
import { useAccess } from '@/features/access/hooks/use-access.ts'
import { TableBase } from '@/shared/components/ui/base/table/TableBase.tsx'
import { TablePaginationBase } from '@/shared/components/ui/base/table/TablePaginationBase.tsx'

interface CustomersTableProps {
    data?: TCustomersListResponse
    isLoading: boolean
    page: number
    perPage: number
    sort: string[]
    filters: TCustomerFilter
    onPageChange: (page: number) => void
    onPerPageChange: (perPage: number) => void
    onSortChange: (sort: string[]) => void
    onFiltersChange: (filters: TCustomerFilter) => void
    onDelete: (item: TCustomer) => void
}

export function CustomersTable({
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
}: CustomersTableProps) {
    const navigate = useNavigate()

    const canView = false//useAccess({ permission: PERMISSIONS.PERMISSION_CUSTOMERS_VIEW }, true)
    const canEdit = useAccess({ permission: PERMISSIONS.PERMISSION_CUSTOMERS_EDIT }, true)
    const canDelete = useAccess({ permission: PERMISSIONS.PERMISSION_CUSTOMERS_DELETE }, true)

    const handleView = useCallback((item: TCustomer) => {
        navigate(PAGE_URLS.customers.view(item.id))
    }, [navigate]);

    const handleEdit = useCallback((item: TCustomer) => {
        navigate(PAGE_URLS.customers.update(item.id))
    }, [navigate]);

    const handleDelete = useCallback((item: TCustomer) => {
        onDelete(item);
    }, [onDelete]);


    const columns = useMemo(
        () =>
            getCustomersTableColumns({
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
            <CustomersTableFilters
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
