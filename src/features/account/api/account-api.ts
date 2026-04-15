import { api } from "@/shared/api/client.ts"
import type { ProfileUpdateSchema } from "@/features/account/schemas/profile-update-schema.ts"
import type { EmailUpdateSchema } from "@/features/account/schemas/email-update-schema.ts"
import type { PasswordUpdateSchema } from "@/features/account/schemas/password-update-schema.ts"

export const accountApi = {
    profileUpdate: (data: ProfileUpdateSchema) =>
        api.post("/account/profile-update", data),
    emailUpdate: (data: EmailUpdateSchema) =>
        api.post("/account/email-update", data),
    passwordUpdate: (data: PasswordUpdateSchema) =>
        api.post("/account/password-update", data),
}