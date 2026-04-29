import { z } from 'zod'
import type { TRoleFormData } from './role.types.ts'

export const roleSchema = z.object({
    title: z.string().min(1, 'Название обязательно'),
    code: z.string().min(1, 'Идентификатор обязателен'),
    description: z.string().min(1, 'Описание обязательно'),
    immutable: z.boolean().default(true),
    //permissionIds: z.array(z.number()).default([]),
    groups: z.array(
        z.object({
            id: z.number(),
            title: z.string(),

            permissions: z.array(
                z.object({
                    id: z.number(),
                    code: z.string(),
                    name: z.string(),
                    selected: z.boolean(),
                })
            ),
        })
    ).superRefine((groups, ctx) => {
        const hasAnySelected = groups.some(group =>
            group.permissions.some(p => p.selected)
        )

        if (!hasAnySelected) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Выберите хотя бы одно разрешение',
                path: [],
            })
        }
    }),
}) //satisfies z.ZodType<TRoleFormData>

export const roleDefaultValues = {
    title: '',
    code: '',
    description: '',
    immutable: true,
    //permissionIds: [],
    groups: []
} satisfies TRoleFormData

//export const createRoleSchema = roleSchema

//export const updateRoleSchema = roleSchema
