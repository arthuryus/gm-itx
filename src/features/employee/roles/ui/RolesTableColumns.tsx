import type { ColumnDef } from '@tanstack/react-table'
import type { TRole } from '../model/role.types.ts'
import {TableColumnHeaderSortBase, TableColumnCellActionsBase} from "@/shared/components/ui/base/table/TableColumnsBase.tsx";

interface RolesTableColumnsProps {
    onView: (item: TRole) => void
    onEdit: (item: TRole) => void
    onDelete: (item: TRole) => void
    canView: boolean
    canEdit: boolean
    canDelete: boolean
}

export function getRolesTableColumns({
    onView,
    onEdit,
    onDelete,
    canView,
    canEdit,
    canDelete,
}: RolesTableColumnsProps): ColumnDef<TRole>[] {
    return [
        {
            accessorKey: 'id',
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="ID" />
            ),
            cell: ({ row }) => <div>{row.getValue('id')}</div>,
        },
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="Название" />
            ),
            cell: ({ row }) => <div>{row.getValue<string>('title')}</div>,
        },
        {
            accessorKey: 'code',
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="Идентификатор" />
            ),
            cell: ({ row }) => <div>{row.getValue<string>('code')}</div>,
        },
        {
            accessorKey: 'description',
            header: 'Описание',
            cell: ({ row }) => {
                const description = row.getValue<string>('description')
                return (
                    <div className="max-w-[300px] truncate" title={description}>
                        {description}
                    </div>
                )
            },
        },
        {
            accessorKey: 'createdDate',
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="Дата создания" />
            ),
            cell: ({ row }) => new Date(row.original.createdDate).toLocaleString('ru-RU'),
        },
        {
            id: 'actions',
            header: 'Действия',
            cell: ({ row }) => (
                <TableColumnCellActionsBase
                    item={row.original}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    canView={canView}
                    canEdit={canEdit}
                    canDelete={canDelete}
                />
            ),
        },
    ]
}
