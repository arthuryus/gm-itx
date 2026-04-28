import { z } from 'zod'
import type { TEmployeeFormData } from './employee.types.ts'
import { type TStatus, STATUS } from "@/shared/constants/main.ts";

export const employeeSchema = z.object({
    firstName: z.string().min(1, 'Имя обязательно'),
    lastName: z.string().min(1, 'Фамилия обязательна'),
    middleName: z.string(),
    email: z.string().min(1, 'Email обязателен').email('Некорректный email'),
    phone: z.string(),
    status: z.enum(Object.values(STATUS) as [TStatus, ...TStatus[]]),
    memberships: z.array(
        z.object({
            groupId: z.string().min(1, 'Группа обязательна'),
            roleIds: z.array(z.string()).min(1, 'Выберите хотя бы одну роль'),
        })
    ).default([]),
}) satisfies z.ZodType<TEmployeeFormData>

export const employeeDefaultValues = {
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    status: STATUS.ACTIVE,
    memberships: [{groupId: '', roleIds: []}],
} satisfies TEmployeeFormData

//export const createEmployeeSchema = employeeSchema

//export const updateEmployeeSchema = employeeSchema
