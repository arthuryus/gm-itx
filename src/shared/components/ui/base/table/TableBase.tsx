import type { ColumnDef } from '@tanstack/react-table'
import { mapTableSortApiToSortingState, mapTableSortSortingStateToApi } from '@/shared/helpers/table.helper.ts'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shadcn/components/ui/table.tsx'
import { Skeleton } from '@/shadcn/components/ui/skeleton.tsx'


export function TableBase<TData>({
    isLoading,
    tableData,
    columns,
    page,
    perPage,
    totalPages,
    sort,
    onSortChange,
}: {
    isLoading: boolean
    tableData: TData[]
    columns: ColumnDef<TData, any>[]
    page: number
    perPage: number
    totalPages: number,
    sort: string[]
    onSortChange: (sort: string[]) => void
}) {
    const sorting = mapTableSortApiToSortingState(sort)

    const table = useReactTable({
        data: tableData,
        columns: columns,
        state: {
            sorting,
            pagination: {
                pageIndex: page - 1,
                pageSize: perPage,
            },
        },
        onSortingChange: (updater) => {
            const newSorting = typeof updater === 'function' ? updater(sorting) : updater

            onSortChange(mapTableSortSortingStateToApi(newSorting))
        },
        manualSorting: true,
        manualPagination: true,
        pageCount: totalPages,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    return (
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
                            {columns.map((_, index) => {
                                return (
                                    <TableCell key={index}>
                                        <Skeleton className="h-24 w-full" />
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    ) : table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Нет результатов
                            </TableCell>
                        </TableRow>
                    )
                    }
                </TableBody>
            </Table>
        </div>
    )
}