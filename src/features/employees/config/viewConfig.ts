import type { ViewFieldConfig } from '@/widgets/crud-view'
import type { Employee } from '../model/employee.types'

export const employeeViewConfig: ViewFieldConfig<Employee>[] = [
  {
    name: 'id',
    label: 'ID',
    type: 'number',
  },
  {
    name: 'firstName',
    label: 'Имя',
    type: 'text',
  },
  {
    name: 'lastName',
    label: 'Фамилия',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
  },
  {
    name: 'phone',
    label: 'Телефон',
    type: 'text',
  },
  {
    name: 'department',
    label: 'Отдел',
    type: 'text',
  },
  {
    name: 'position',
    label: 'Должность',
    type: 'text',
  },
  {
    name: 'hireDate',
    label: 'Дата приема',
    type: 'date',
  },
  {
    name: 'salary',
    label: 'Зарплата',
    type: 'number',
    decimals: 2,
  },
  {
    name: 'isActive',
    label: 'Статус',
    type: 'boolean',
    trueLabel: 'Активен',
    falseLabel: 'Неактивен',
  },
  {
    name: 'createdAt',
    label: 'Создано',
    type: 'datetime',
  },
  {
    name: 'updatedAt',
    label: 'Обновлено',
    type: 'datetime',
  },
]
