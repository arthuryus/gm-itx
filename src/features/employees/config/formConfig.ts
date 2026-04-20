import type { FieldConfig } from '@/shared/components/form-fields'
import type { EmployeeFormData } from '../model/employee.types'

export const employeeFormConfig: FieldConfig<EmployeeFormData>[] = [
  {
    name: 'firstName',
    label: 'Имя',
    type: 'text',
    placeholder: 'Введите имя',
    required: true,
  },
  {
    name: 'lastName',
    label: 'Фамилия',
    type: 'text',
    placeholder: 'Введите фамилию',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'Введите email',
    required: true,
  },
  {
    name: 'phone',
    label: 'Телефон',
    type: 'text',
    placeholder: 'Введите телефон',
  },
  {
    name: 'department',
    label: 'Отдел',
    type: 'text',
    placeholder: 'Введите отдел',
  },
  {
    name: 'position',
    label: 'Должность',
    type: 'text',
    placeholder: 'Введите должность',
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
    placeholder: 'Введите зарплату',
    min: 0,
  },
  {
    name: 'isActive',
    label: 'Активен',
    type: 'checkbox',
  },
]
