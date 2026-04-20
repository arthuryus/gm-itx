import { z } from 'zod'

export const GroupStatusSchema = z.enum(['ACTIVE', 'INACTIVE'])

export const groupSchema = z.object({
    name: z.string().min(1, 'Название обязательно'),
    description: z.string().min(1, 'Описание обязательно'),
    status: GroupStatusSchema,
    priority: z.number().int().min(0, 'Приоритет должен быть не менее 0'),
})

export const createGroupSchema = groupSchema

export const updateGroupSchema = groupSchema

export type GroupFormData = z.infer<typeof groupSchema>
