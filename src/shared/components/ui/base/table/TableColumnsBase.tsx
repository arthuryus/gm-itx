import type { Column } from '@tanstack/react-table'
import { Button } from '@/shadcn/components/ui/button'
import { ArrowUpDown, ArrowUp, ArrowDown, Eye, Pencil, Trash2 } from 'lucide-react'

export function TableColumnHeaderSortBase<TData>({
    column,
    label,
}: {
    column: Column<TData, unknown>
    label: string
}) {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            {label}
            {column.getIsSorted() ? (
                column.getIsSorted() === 'asc' ? (
                    <ArrowDown className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUp className="ml-2 h-4 w-4" />
                )
            ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
        </Button>
    )
}

export function TableColumnCellActionsBase<TData>({
    item,
    onView,
    onEdit,
    onDelete,
    canView,
    canEdit,
    canDelete,
}: {
    item: TData
    onView?: (item: TData) => void
    onEdit?: (item: TData) => void
    onDelete?: (item: TData) => void
    canView?: boolean
    canEdit?: boolean
    canDelete?: boolean
}) {
    return (
        <div className="flex items-center gap-2">
            {canView && onView && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(item)}
                    title="Просмотр"
                >
                    <Eye className="h-4 w-4" />
                </Button>
            )}

            {canEdit && onEdit && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item)}
                    title="Редактировать"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            )}

            {canDelete && onDelete && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(item)}
                    title="Удалить"
                    className="text-destructive hover:text-destructive"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            )}
        </div>
    )
}