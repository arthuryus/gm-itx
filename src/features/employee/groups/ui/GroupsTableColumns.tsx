import type { ColumnDef } from '@tanstack/react-table'
import type { TGroup } from '../model/group.types.ts'
import { type TStatus, STATUS, STATUS_LABEL } from '@/shared/constants/main.ts'
import {TableColumnHeaderSortBase, TableColumnCellActionsBase} from "@/shared/components/ui/base/table/TableColumnsBase.tsx";
import { Badge } from '@/shadcn/components/ui/badge'

interface GroupsTableColumnsProps {
    onView: (item: TGroup) => void
    onEdit: (item: TGroup) => void
    onDelete: (item: TGroup) => void
    canView: boolean
    canEdit: boolean
    canDelete: boolean
}

export function getGroupsTableColumns({
    onView,
    onEdit,
    onDelete,
    canView,
    canEdit,
    canDelete,
}: GroupsTableColumnsProps): ColumnDef<TGroup>[] {
    return [
        {
            accessorKey: 'id',
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="ID" />
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
        },
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="Название" />
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue<string>('name')}</div>,
            /*cell: ({ row }) => {
                const item = row.original
                return (
                    <Link
                        to={`/groups/${item.id}`}
                        className="font-medium text-primary hover:underline"
                    >
                        {item.name}
                    </Link>
                )
            },*/
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
            accessorKey: 'status',
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="Статус" />
            ),
            cell: ({ row }) => {
                const status = row.getValue<TStatus>('status')
                return (
                    <Badge variant={status === STATUS.ACTIVE ? 'default' : 'secondary'}>
                        {status === STATUS.ACTIVE ? STATUS_LABEL.ACTIVE : STATUS_LABEL.INACTIVE}
                    </Badge>
                )
            },
        },
        {
            accessorKey: 'priority',
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="Приоритет" />
            ),
            cell: ({ row }) => <div>{row.getValue('priority')}</div>,
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
