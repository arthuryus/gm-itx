import { z } from "zod"

export const signupSchema = z.object({
    fio: z
        .string()
        .min(1, "Имя обязателен"),
    email: z
        .string()
        .min(1, "Email обязателен")
        .email("Неверный формат email"),
    password: z
        .string()
        .min(1, "Пароль обязателен")
        .min(8, "Минимум 8 символов"),
    passwordRepeat: z
        .string()
        .min(1, "Подтвердите пароль обязателен")
        .min(8, "Минимум 8 символов"),
})

export type SignupSchema = z.infer<typeof signupSchema>