import { z } from "zod"

export const passwordResetSchema = z.object({
    email: z
        .string()
        .min(1, "Email обязателен")
        .email("Неверный формат email"),
})

export type PasswordResetSchema = z.infer<typeof passwordResetSchema>