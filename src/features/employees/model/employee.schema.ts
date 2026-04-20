import { z } from 'zod'
import type { EmployeeFormData } from './employee.types'

export const employeeSchema = z.object({
  firstName: z.string().min(1, 'Имя обязательно').max(100, 'Максимум 100 символов'),
  lastName: z.string().min(1, 'Фамилия обязательна').max(100, 'Максимум 100 символов'),
  email: z.string().min(1, 'Email обязателен').email('Некорректный email'),
  phone: z.string().optional(),
  department: z.string().optional(),
  position: z.string().optional(),
  hireDate: z.string().optional(),
  salary: z.number().optional(),
  isActive: z.boolean().default(true),
}) satisfies z.ZodType<EmployeeFormData>

export type EmployeeSchema = typeof employeeSchema
