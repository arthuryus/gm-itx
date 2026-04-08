//import axios from "axios"
import { api, apiRefresh } from "@/shared/api/client.ts" //
import type { LoginSchema } from "@/features/auth/schemas/login-schema.ts"
import type { PasswordResetSchema } from "@/features/auth/schemas/password-reset-schema.ts"
import type { SignupSchema } from "@/features/auth/schemas/signup-schema.ts"

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

    signup: (data: SignupSchema) =>
        api.post("/auth/signup.php", data),
    passwordReset: (data: PasswordResetSchema) =>
        api.post("/auth/password-reset.php", data),
    passwordResetConfirm: (data: { password: string; password_repeat: string; }) =>
        api.post("/auth/password-reset-confirm.php", data),

    me400: () =>
        api.post("/auth/me400.php"),
}