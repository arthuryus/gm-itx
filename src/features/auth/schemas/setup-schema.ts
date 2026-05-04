import { z } from "zod"

export const setupSchema = z.object({
    newEmail: z
        .string()
        .min(1, "Новый Email обязателен")
        .email("Неверный формат email"),
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

export type SetupSchema = z.infer<typeof setupSchema>

export const setupDefaultValues = {
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
} as const