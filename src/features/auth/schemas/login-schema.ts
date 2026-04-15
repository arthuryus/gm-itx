import { z } from "zod"

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email обязателен")
        .email("Неверный формат email"),
    password: z
        .string()
        .min(1, "Пароль обязателен")
        .min(6, "Минимум 6 символов"),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const loginDefaultValues = {
    email: "",
    password: "",
} as const