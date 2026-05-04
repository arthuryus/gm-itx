import { z } from 'zod'
import type { TCustomerFormData } from './customer.types.ts'
import { type TStatus, STATUS } from "@/shared/constants/main.ts";

export const customerSchema = z.object({
    firstName: z.string().min(1, 'Имя обязательно'),
    lastName: z.string().min(1, 'Фамилия обязательна'),
    middleName: z.string(),
    email: z.string().min(1, 'Email обязателен').email('Некорректный email'),
    phone: z.string().regex(/^\+7\d{10}$/, "Некорректный номер телефона").optional().or(z.literal("")),
    status: z.enum(Object.values(STATUS) as [TStatus, ...TStatus[]]),
    memberships: z.array(
        z.object({
            groupId: z.string().min(1, 'Группа обязательна'),
            roleIds: z.array(z.string()).min(1, 'Выберите хотя бы одну роль'),
        })
    ).default([]),
}) satisfies z.ZodType<TCustomerFormData>

export const customerDefaultValues = {
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    status: STATUS.ACTIVE,
    memberships: [{groupId: '', roleIds: []}],
} satisfies TCustomerFormData

//export const createCustomerSchema = customerSchema

//export const updateCustomerSchema = customerSchema
