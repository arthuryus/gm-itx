import { Link } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ArrowUp, ArrowDown, Eye, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/shadcn/components/ui/button'
import { Badge } from '@/shadcn/components/ui/badge'
import type { Group, GroupStatus } from '@/features/groups/model/group.types.ts'

interface GroupsTableColumnsProps {
    onView: (group: Group) => void
    onEdit: (group: Group) => void
    onDelete: (group: Group) => void
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
}: GroupsTableColumnsProps): ColumnDef<Group>[] {
    return [
        {
            accessorKey: 'id',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
        },
        {
            accessorKey: 'name',
            header: ({ column }) => {
                const isSorted = column.getIsSorted()
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Название
                        {isSorted ?
                            ((column.getIsSorted() === 'asc') ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />) :
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        }
                    </Button>
                )
            },
            cell: ({ row }) => {
                const group = row.original
                return (
                    <Link
                        to={`/groups/${group.id}`}
                        className="font-medium text-primary hover:underline"
                    >
                        {group.name}
                    </Link>
                )
            },
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
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Статус
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const status = row.getValue<GroupStatus>('status')
                return (
                    <Badge variant={status === 'ACTIVE' ? 'default' : 'secondary'}>
                        {status === 'ACTIVE' ? 'Активна' : 'Неактивна'}
                    </Badge>
                )
            },
        },
        {
            accessorKey: 'priority',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Приоритет
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue('priority')}</div>,
        },
        {
            id: 'actions',
            header: 'Действия',
            cell: ({ row }) => {
                const group = row.original
                return (
                    <div className="flex items-center gap-2">
                        {canView && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onView(group)}
                                title="Просмотр"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                        )}
                        {canEdit && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit(group)}
                                title="Редактировать"
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                        )}
                        {canDelete && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(group)}
                                title="Удалить"
                                className="text-destructive hover:text-destructive"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                )
            },
        },
    ]
}
