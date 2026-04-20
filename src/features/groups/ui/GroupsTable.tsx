import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    type SortingState,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shadcn/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shadcn/components/ui/table'
import { Skeleton } from '@/shadcn/components/ui/skeleton'
import { Empty, EmptyContent } from '@/shadcn/components/ui/empty'
import { getGroupsTableColumns } from './GroupsTableColumns'
import { GroupsTableFilters } from './GroupsTableFilters'
import type { Group, GroupFilter, GroupsListResponse } from '@/features/groups/model/group.types.ts'
import { PERMISSIONS } from '@/shared/config/permissions.ts'
import { useAccess } from '@/features/access/hooks/use-access.ts'
import { DEFAULT_PER_PAGE, PER_PAGE_OPTIONS } from '@/features/groups/lib/constants.ts'
import { Input } from '@/shadcn/components/ui/input'

interface GroupsTableProps {
    data?: GroupsListResponse
    isLoading: boolean
    page: number
    perPage: number
    sort: string[]
    filters: GroupFilter
    onPageChange: (page: number) => void
    onPerPageChange: (perPage: number) => void
    onSortChange: (sort: string[]) => void
    onFiltersChange: (filters: GroupFilter) => void
    onDelete: (group: Group) => void
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
    const [sorting, setSorting] = useState<SortingState>([])

    const canView = useAccess({ permission: PERMISSIONS.PERMISSION_GROUPS_VIEW }, true)
    const canEdit = useAccess({ permission: PERMISSIONS.PERMISSION_GROUPS_EDIT }, true)
    const canDelete = useAccess({ permission: PERMISSIONS.PERMISSION_GROUPS_DELETE }, true)

    const handleView = (group: Group) => {
        navigate(`/groups/${group.id}`)
    }

    const handleEdit = (group: Group) => {
        navigate(`/groups/update/${group.id}`)
    }

    const handleDelete = (group: Group) => {
        onDelete(group)
    }

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
        [canView, canEdit, canDelete]
    )

    const tableData = useMemo(() => data?.items ?? [], [data])
    const totalPages = data?.meta?.totalPages ?? 0
    const totalItems = data?.meta?.totalItems ?? 0

    const table = useReactTable({
        data: tableData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: (updater) => {
            const newSorting = typeof updater === 'function' ? updater(sorting) : updater
            setSorting(newSorting)

            const newSort: string[] = newSorting.map((s) =>
                s.desc ? `-${s.id}` : s.id
            )
            onSortChange(newSort)
        },
        state: {
            sorting,
            pagination: {
                pageIndex: page - 1,
                pageSize: perPage,
            },
        },
        manualSorting: true,
        manualPagination: true,
        pageCount: totalPages,
    })

    /*if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-[300px] w-full" />
            </div>
        )
    }*/

    /*if (!data?.items?.length && !Object.keys(filters).some((k) => filters[k as keyof GroupFilter])) {
        return (
            <Empty>
                <EmptyContent>
                    <div>Список групп пуст.</div>
                </EmptyContent>
            </Empty>
        )
    }*/

    /*<TableRow>
        <TableHead>
            <Input
                placeholder="ID..."
                value={filters.id || ''}
                onChange={(e) => onFiltersChange({ ...filters, id: e.target.value })}
            />
        </TableHead>
    </TableRow>*/
    return (
        <div className="space-y-4">
            <GroupsTableFilters filters={filters} onFiltersChange={onFiltersChange} />

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        { isLoading ? (
                            <TableRow>
                                {columns.map((column, index) => {
                                    return (
                                            <TableCell
                                                key={index}
                                                //className="h---24 text---center"
                                            >
                                                <Skeleton className="h-10 w-full" />
                                            </TableCell>
                                    )
                                })}
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && 'selected'}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        Нет результатов
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Всего: {totalItems}</span>
                    <span className="hidden sm:inline">|</span>
                    <span className="hidden sm:inline">
                        Страница {page} из {totalPages || 1}
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">На странице:</span>
                        <Select
                            value={perPage.toString()}
                            onValueChange={(value) => onPerPageChange(Number(value))}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {PER_PAGE_OPTIONS.map((option) => (
                                    <SelectItem key={option} value={option.toString()}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="hidden h-8 w-8 lg:flex"
                            onClick={() => onPageChange(1)}
                            disabled={page <= 1}
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onPageChange(page - 1)}
                            disabled={page <= 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onPageChange(page + 1)}
                            disabled={page >= totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="hidden h-8 w-8 lg:flex"
                            onClick={() => onPageChange(totalPages)}
                            disabled={page >= totalPages}
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
