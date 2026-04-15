import { z } from "zod"

export const passwordResetValidateSchema = z.object({
    token: z
        .string()
        .min(1, "Ссылка для восстановления пароля неверная"),
})

export type PasswordResetValidateSchema = z.infer<typeof passwordResetValidateSchema>

export const passwordResetValidateDefaultValues = {
    token: "",
} as const