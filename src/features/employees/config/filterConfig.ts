import type { FilterConfig } from '@/shared/components/filters'
import type { EmployeeFilter } from '../model/employee.types'

export const employeeFilterConfig: FilterConfig<EmployeeFilter>[] = [
  {
    name: 'id',
    label: 'ID',
    type: 'number',
    placeholder: 'Поиск по ID',
  },
  {
    name: 'firstName',
    label: 'Имя',
    type: 'text',
    placeholder: 'Поиск по имени',
  },
  {
    name: 'lastName',
    label: 'Фамилия',
    type: 'text',
    placeholder: 'Поиск по фамилии',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'Поиск по email',
  },
  {
    name: 'department',
    label: 'Отдел',
    type: 'text',
    placeholder: 'Поиск по отделу',
  },
  {
    name: 'position',
    label: 'Должность',
    type: 'text',
    placeholder: 'Поиск по должности',
  },
  {
    name: 'isActive',
    label: 'Статус',
    type: 'select',
    placeholder: 'Выберите статус',
    options: [
      { value: 'true', label: 'Активен' },
      { value: 'false', label: 'Неактивен' },
    ],
  },
]
