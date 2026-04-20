import { useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table'
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shadcn/components/ui/pagination'
import { FilterText, FilterNumber, FilterSelect, FilterDate } from '@/shared/components/filters'
import type { FilterConfig } from '@/shared/components/filters'
import { useFilters } from '@/shared/hooks/useFilters'
import { useCrudTable } from '../hooks/useCrudTable'
import type { CrudTableProps } from '../types'

export function CrudTable<T, TFilter>({
  entityName,
  queryKey,
  api,
  columns,
  filterConfig,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50],
  showCreateButton = false,
  onCreateClick,
  onViewClick,
  onEditClick,
  onDeleteClick,
  showViewAction = true,
  showEditAction = true,
  showDeleteAction = true,
}: CrudTableProps<T, TFilter>) {
  // Filters
  const { filters, setFilter, resetFilters } = useFilters<TFilter>({
    debounceMs: 300,
  })

  // Data fetching
  const {
    data,
    total,
    pagination,
    setPagination,
    sorting,
    setSorting,
    isLoading,
    error,
  } = useCrudTable({
    api,
    queryKey,
    filters,
    pageSize,
  })

  // Table instance
  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    rowCount: total,
  })

  // Generate pagination items
  const paginationItems = useMemo(() => {
    const currentPage = pagination.pageIndex + 1
    const totalPages = Math.ceil(total / pagination.pageSize) || 1
    const items: (number | 'ellipsis')[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i)
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) items.push(i)
        items.push('ellipsis')
        items.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        items.push(1)
        items.push('ellipsis')
        for (let i = totalPages - 4; i <= totalPages; i++) items.push(i)
      } else {
        items.push(1)
        items.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) items.push(i)
        items.push('ellipsis')
        items.push(totalPages)
      }
    }

    return items
  }, [pagination.pageIndex, pagination.pageSize, total])

  // Render filter component based on config
  const renderFilter = (config: FilterConfig<TFilter>) => {
    const value = filters[config.name]

    switch (config.type) {
      case 'text':
        return (
          <FilterText
            key={String(config.name)}
            config={config}
            value={value as string | undefined}
            onChange={(v) => setFilter(config.name, v as TFilter[keyof TFilter])}
          />
        )
      case 'number':
        return (
          <FilterNumber
            key={String(config.name)}
            config={config}
            value={value as number | undefined}
            onChange={(v) => setFilter(config.name, v as TFilter[keyof TFilter])}
          />
        )
      case 'select':
        return (
          <FilterSelect
            key={String(config.name)}
            config={config}
            value={value as string | undefined}
            onChange={(v) => setFilter(config.name, v as TFilter[keyof TFilter])}
          />
        )
      case 'date':
        return (
          <FilterDate
            key={String(config.name)}
            config={config}
            value={value as string | undefined}
            onChange={(v) => setFilter(config.name, v as TFilter[keyof TFilter])}
          />
        )
      default:
        return null
    }
  }

  // Action columns
  const actionColumn: ColumnDef<T> = {
    id: 'actions',
    header: 'Действия',
    cell: ({ row }) => {
      const item = row.original as T & { id: string | number }
      const id = item.id

      return (
        <div className="flex items-center gap-2">
          {showViewAction && onViewClick && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onViewClick(id)}
              title="Просмотр"
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {showEditAction && onEditClick && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onEditClick(id)}
              title="Редактировать"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {showDeleteAction && onDeleteClick && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDeleteClick(id)}
              title="Удалить"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )
    },
  }

  // Combine data columns with action column
  const allColumns = useMemo<ColumnDef<T>[]>(() => {
    if (onViewClick || onEditClick || onDeleteClick) {
      return [...columns, actionColumn]
    }
    return columns
  }, [columns, onViewClick, onEditClick, onDeleteClick])

  const hasActions = onViewClick || onEditClick || onDeleteClick

  return (
    <div className="space-y-4">
      {/* Filters and Create Button */}
      <div className="flex flex-wrap items-end gap-4 p-4 border rounded-lg bg-card">
        {filterConfig.map((config) => renderFilter(config))}
        
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Сбросить
          </Button>
          {showCreateButton && onCreateClick && (
            <Button size="sm" onClick={onCreateClick}>
              <Plus className="h-4 w-4 mr-1" />
              Создать
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
                {hasActions && <TableHead>Действия</TableHead>}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="h-32 text-center"
                >
                  Загрузка...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="h-32 text-center text-destructive"
                >
                  Ошибка: {error.message}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  {hasActions && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {showViewAction && onViewClick && (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => {
                              const item = row.original as T & { id: string | number }
                              onViewClick(item.id)
                            }}
                            title="Просмотр"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        {showEditAction && onEditClick && (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => {
                              const item = row.original as T & { id: string | number }
                              onEditClick(item.id)
                            }}
                            title="Редактировать"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                        {showDeleteAction && onDeleteClick && (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => {
                              const item = row.original as T & { id: string | number }
                              onDeleteClick(item.id)
                            }}
                            title="Удалить2"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="h-32 text-center"
                >
                  Нет данных
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            Показано {data.length} из {total} записей
          </span>
          <select
            value={pagination.pageSize}
            onChange={(e) => {
              setPagination({
                pageIndex: 0,
                pageSize: Number(e.target.value),
              })
            }}
            className="h-8 rounded-md border border-input bg-transparent px-2 py-1 text-sm"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} / стр
              </option>
            ))}
          </select>
        </div>

        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>

            {paginationItems.map((item, index) => (
              <PaginationItem key={index}>
                {item === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={pagination.pageIndex + 1 === item}
                    onClick={() => table.setPageIndex(item - 1)}
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
