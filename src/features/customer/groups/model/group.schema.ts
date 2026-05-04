import { z } from 'zod'
import type { TGroupFormData } from './group.types.ts'
import { type TStatus, STATUS } from "@/shared/constants/main.ts";

export const groupSchema = z.object({
    name: z.string().min(1, 'Название обязательно'),
    description: z.string(),//.min(1, 'Описание обязательно'),
    status: z.enum(Object.values(STATUS) as [TStatus, ...TStatus[]]),
    priority: z.number().int().min(0, 'Приоритет должен быть не менее 0'),
}) //satisfies z.ZodType<GroupFormData>

export const groupDefaultValues = {
    name: "",
    description: "",
    status: STATUS.ACTIVE,
    priority: 0,
} satisfies TGroupFormData

//export const createGroupSchema = groupSchema

//export const updateGroupSchema = groupSchema
