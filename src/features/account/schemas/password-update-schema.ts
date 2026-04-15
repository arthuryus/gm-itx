import { z } from "zod"

export const passwordUpdateSchema = z.object({
    currentPassword: z
        .string()
        .min(1, "Текущий пароль обязателен")
        .min(6, "Минимум 6 символов"),
    newPassword: z
        .string()
        .min(1, "Новый пароль обязателен")
        .min(6, "Минимум 6 символов"),
    newPasswordConfirm: z
        .string()
        .min(1, "Подтвердите новый пароль обязателен")
        .min(6, "Минимум 6 символов"),
})

export type PasswordUpdateSchema = z.infer<typeof passwordUpdateSchema>

export const passwordUpdateDefaultValues = {
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
}