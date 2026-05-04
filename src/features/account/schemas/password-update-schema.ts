import { z } from "zod"

export const passwordUpdateSchema = z.object({
    currentPassword: z
        .string()
        .min(1, "Текущий пароль обязателен")
        .min(8, "Минимум 8 символов"),
    newPassword: z
        .string()
        .min(1, "Новый пароль обязателен")
        .min(8, "Минимум 8 символов"),
    newPasswordConfirm: z
        .string()
        .min(1, "Подтвердите новый пароль обязателен")
        .min(8, "Минимум 8 символов"),
})

export type PasswordUpdateSchema = z.infer<typeof passwordUpdateSchema>

export const passwordUpdateDefaultValues = {
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
}