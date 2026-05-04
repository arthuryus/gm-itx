import { z } from "zod"

export const passwordResetConfirmSchema = z.object({
    newPassword: z
        .string()
        .min(1, "Пароль обязателен")
        .min(8, "Минимум 8 символов"),
    newPasswordConfirm: z
        .string()
        .min(1, "Подтвердите пароль обязателен")
        .min(8, "Минимум 8 символов"),
    token: z
        .string()
        .min(1, "Ссылка для восстановления пароля неверная"),
})

export type PasswordResetConfirmSchema = z.infer<typeof passwordResetConfirmSchema>

export const passwordResetConfirmDefaultValues = {
    newPassword: "",
    newPasswordConfirm: "",
    token: "",
} as const