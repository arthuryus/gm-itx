import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/shadcn/components/ui/badge'
import type { Employee } from '../model/employee.types'

export const employeeColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 80,
  },
  {
    accessorKey: 'firstName',
    header: 'Имя',
  },
  {
    accessorKey: 'lastName',
    header: 'Фамилия',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'department',
    header: 'Отдел',
  },
  {
    accessorKey: 'position',
    header: 'Должность',
  },
  {
    accessorKey: 'isActive',
    header: 'Статус',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean
      return (
        <Badge variant={isActive ? 'default' : 'secondary'}>
          {isActive ? 'Активен' : 'Неактивен'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Создано',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string
      return date ? new Date(date).toLocaleDateString('ru-RU') : '-'
    },
  },
]
