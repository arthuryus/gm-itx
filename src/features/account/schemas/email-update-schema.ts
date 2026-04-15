import { z } from "zod"

export const emailUpdateSchema = z.object({
    email: z
        .string()
        .min(1, "Email обязателен")
        .email("Неверный формат email"),
})

export type EmailUpdateSchema = z.infer<typeof emailUpdateSchema>

export const emailUpdateDefaultValues = {
    email: "",
}