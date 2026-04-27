//import { Link } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { TGroup } from '../model/group.types.ts'
import { type TStatus, STATUS, STATUS_LABEL } from '@/shared/constants/main.ts'
import { Button } from '@/shadcn/components/ui/button'
import { Badge } from '@/shadcn/components/ui/badge'
import { ArrowUpDown, ArrowUp, ArrowDown, Eye, Pencil, Trash2 } from 'lucide-react'

interface GroupsTableColumnsProps {
    onView: (group: TGroup) => void
    onEdit: (group: TGroup) => void
    onDelete: (group: TGroup) => void
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
            header: ({ column }) => {
                const isSorted = column.getIsSorted()
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        ID
                        {isSorted ?
                            ((column.getIsSorted() === 'asc') ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />) :
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        }
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
            cell: ({ row }) => <div className="font-medium">{row.getValue<string>('name')}</div>,
            /*cell: ({ row }) => {
                const group = row.original
                return (
                    <Link
                        to={`/groups/${group.id}`}
                        className="font-medium text-primary hover:underline"
                    >
                        {group.name}
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
            header: ({ column }) => {
                const isSorted = column.getIsSorted()
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Статус
                        {isSorted ?
                            ((column.getIsSorted() === 'asc') ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />) :
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        }
                    </Button>
                )
            },
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
            header: ({ column }) => {
                const isSorted = column.getIsSorted()
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Приоритет
                        {isSorted ?
                            ((column.getIsSorted() === 'asc') ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />) :
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        }
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
