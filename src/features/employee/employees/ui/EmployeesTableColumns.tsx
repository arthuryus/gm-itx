import type { ColumnDef } from '@tanstack/react-table'
import type { TEmployee } from '../model/employee.types.ts'
import { type TStatus, STATUS, STATUS_LABEL } from '@/shared/constants/main.ts'
import {TableColumnHeaderSortBase, TableColumnCellActionsBase} from "@/shared/components/ui/base/table/TableColumnsBase.tsx";
import { Badge } from '@/shadcn/components/ui/badge'

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
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="ID" />
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
        },
        {
            accessorKey: 'firstName',
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="Имя" />
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue<string>('firstName')}</div>,
        },
        {
            accessorKey: 'lastName',
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="Фамилия" />
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue<string>('lastName')}</div>,
        },
        {
            accessorKey: 'middleName',
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="Отчество" />
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue<string>('middleName')}</div>,
        },
        {
            accessorKey: 'email',
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="Email" />
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue<string>('email')}</div>,
        },
        {
            accessorKey: 'phone',
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="Телефон" />
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue<string>('phone')}</div>,
        },
        {
            accessorKey: 'roleIds',
            header: ({ column }) => (
                <TableColumnHeaderSortBase column={column} label="Роли" />
            ),
            cell: ({ row }) => {
                const memberships = row.original.memberships

                return (
                    <div className="flex flex-col gap-1">
                        {memberships.map((membership) => (
                            <div key={membership.groupId} className="flex flex-col gap-1">
                                {membership.roles.map((role) => (
                                    <Badge key={role.id} variant="secondary">{role.title}</Badge>
                                ))}
                            </div>
                        ))}
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
