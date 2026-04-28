//import { Link } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { TEmployee } from '../model/employee.types.ts'
import { type TStatus, STATUS, STATUS_LABEL } from '@/shared/constants/main.ts'
import { Button } from '@/shadcn/components/ui/button'
import { Badge } from '@/shadcn/components/ui/badge'
import { ArrowUpDown, ArrowUp, ArrowDown, Eye, Pencil, Trash2 } from 'lucide-react'

interface EmployeesTableColumnsProps {
    onView: (item: TEmployee) => void
    onEdit: (item: TEmployee) => void
    onDelete: (item: TEmployee) => void
    canView: boolean
    canEdit: boolean
    canDelete: boolean
}

export function getEmployeesTableColumns({
    onView,
    onEdit,
    onDelete,
    canView,
    canEdit,
    canDelete,
}: EmployeesTableColumnsProps): ColumnDef<TEmployee>[] {
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
            accessorKey: 'firstName',
            header: ({ column }) => {
                const isSorted = column.getIsSorted()
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Имя
                        {isSorted ?
                            ((column.getIsSorted() === 'asc') ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />) :
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        }
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-medium">{row.getValue<string>('firstName')}</div>,
        },
        {
            accessorKey: 'lastName',
            header: ({ column }) => {
                const isSorted = column.getIsSorted()
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Фамилия
                        {isSorted ?
                            ((column.getIsSorted() === 'asc') ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />) :
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        }
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-medium">{row.getValue<string>('lastName')}</div>,
        },
        {
            accessorKey: 'middleName',
            header: ({ column }) => {
                const isSorted = column.getIsSorted()
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Отчество
                        {isSorted ?
                            ((column.getIsSorted() === 'asc') ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />) :
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        }
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-medium">{row.getValue<string>('middleName')}</div>,
        },
        {
            accessorKey: 'email',
            header: ({ column }) => {
                const isSorted = column.getIsSorted()
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Email
                        {isSorted ?
                            ((column.getIsSorted() === 'asc') ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />) :
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        }
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-medium">{row.getValue<string>('email')}</div>,
        },
        {
            accessorKey: 'phone',
            header: ({ column }) => {
                const isSorted = column.getIsSorted()
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Телефон
                        {isSorted ?
                            ((column.getIsSorted() === 'asc') ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />) :
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        }
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-medium">{row.getValue<string>('phone')}</div>,
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
            id: 'actions',
            header: 'Действия',
            cell: ({ row }) => {
                const item = row.original
                return (
                    <div className="flex items-center gap-2">
                        {canView && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onView(item)}
                                title="Просмотр"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                        )}
                        {canEdit && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit(item)}
                                title="Редактировать"
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                        )}
                        {canDelete && (
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
            },
        },
    ]
}
