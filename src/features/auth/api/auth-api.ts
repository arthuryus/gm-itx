//import axios from "axios"
import { api, apiRefresh } from "@/shared/api/client.ts" //
import type { LoginSchema } from "@/features/auth/schemas/login-schema.ts"
import type { PasswordResetSchema } from "@/features/auth/schemas/password-reset-schema.ts"
import type { PasswordResetValidateSchema } from "@/features/auth/schemas/password-reset-validate-schema.ts"
import type { PasswordResetConfirmSchema } from "@/features/auth/schemas/password-reset-confirm-schema.ts"
import type { SetupSchema } from "@/features/auth/schemas/setup-schema.ts"
//import type { SignupSchema } from "@/features/auth/schemas/signup-schema.ts"

export const authApi = {
    refresh: () =>
        apiRefresh.get("/auth/refresh"),
    /*refresh: () =>
        axios.get("/api/client/auth/refresh", {
            withCredentials: true,
        }),*/
    me: () =>
        api.get("/auth/me"),

    login: (data: LoginSchema) =>
        api.post("/auth/login", data),
    logout: () =>
        api.post("/auth/logout"),
    setup: (data: SetupSchema) =>
        api.post("/auth/bootstrap/request", data),

    passwordReset: (data: PasswordResetSchema) =>
        api.post("/auth/password-reset/request", data),
    passwordResetValidate: (data: PasswordResetValidateSchema) =>
        api.post("/auth/password-reset/validate", data),
    passwordResetConfirm: (data: PasswordResetConfirmSchema) =>
        api.post("/auth/password-reset/confirm", data),


    signup: (data: { password: string; password_repeat: string; }) =>
        api.post("/auth/signup.php", data),

    me400: () =>
        api.post("/auth/me400.php"),
}