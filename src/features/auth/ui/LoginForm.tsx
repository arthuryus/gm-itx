import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { loginSchema } from "@/features/auth/schemas/login-schema.ts"
import type { LoginSchema } from "@/features/auth/schemas/login-schema.ts"
import { authApi } from "@/features/auth/api/auth-api.ts"
import { useAuthStore } from "@/features/auth/store/auth-store.ts"

//import { useNavigate, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shadcn/components/ui/field"
import { Button } from "@/shadcn/components/ui/button"
import { Input } from "@/shadcn/components/ui/input"


export default function LoginForm() {
    const login = useAuthStore((s) => s.login)
    //const location = useLocation();
    //const navigate = useNavigate();

    const doLogin = async (data: LoginSchema) => {
        try {
            const response = await authApi.login(data)
            login(response.data)

            //const from = location.state?.from || "/";
            //navigate(from, { replace: true })
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    return (
        <form onSubmit={form.handleSubmit(doLogin)}>
            {form.formState.errors.root?.message && (
                <div className="text-red-500 text-sm mb-4">
                    {form.formState.errors.root.message}
                </div>
            )}
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                {...field}
                                type="email"
                                id="email"
                                aria-invalid={fieldState.invalid}
                                placeholder="Введите email"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <div className="flex items-center">
                                <FieldLabel htmlFor="password">Пароль</FieldLabel>
                                <Link
                                    to="/password-reset"
                                    className="ml-auto text-primary text-sm underline-offset-4 hover:underline"
                                >
                                    Забыл пароль?
                                </Link>
                            </div>
                            <Input
                                {...field}
                                type="password"
                                id="password"
                                aria-invalid={fieldState.invalid}
                                placeholder="Введите пароль"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Button type="submit" className="w-full">
                    Войти
                </Button>
            </FieldGroup>
        </form>
    )
}
