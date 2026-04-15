import { z } from "zod"

export const profileUpdateSchema = z.object({
    firstName: z
        .string()
        .min(1, "Имя обязателен"),
    lastName: z
        .string()
        .min(1, "Фамилия обязателен"),
})

export type ProfileUpdateSchema = z.infer<typeof profileUpdateSchema>

export const profileUpdateDefaultValues = {
    firstName: "",
    lastName: "",
}