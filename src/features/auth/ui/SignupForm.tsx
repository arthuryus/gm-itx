import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { signupSchema } from "@/features/auth/schemas/signup-schema.ts"
import type { SignupSchema } from "@/features/auth/schemas/signup-schema.ts"
import { authApi } from "@/features/auth/api/auth-api.ts"
import { useAuthStore } from "@/features/auth/store/auth-store.ts"

import { Field, FieldError, FieldGroup, FieldLabel } from "@/shadcn/components/ui/field"
import { Button } from "@/shadcn/components/ui/button"
import { Input } from "@/shadcn/components/ui/input"

export default function SignupForm() {
    const login = useAuthStore((s) => s.login)

    const doSignup = async (data: SignupSchema) => {
        try {
            const response = await authApi.signup(data)
            login(response.data)
        } catch (error) {
            handlerError(error, {form})
        }
    }

    const form = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fio: "",
            email: "",
            password: "",
            passwordRepeat: "",
        }
    })

    return (
        <form onSubmit={form.handleSubmit(doSignup)}>
            <FieldGroup>
                <Controller
                    name="fio"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="fio">Имя</FieldLabel>
                            <Input
                                {...field}
                                type="text"
                                id="fio"
                                aria-invalid={fieldState.invalid}
                                placeholder="Введите ваше имя"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
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
                            <FieldLabel htmlFor="password">Пароль</FieldLabel>
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
                <Controller
                    name="passwordRepeat"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="passwordRepeat">Подтвердите пароль</FieldLabel>
                            <Input
                                {...field}
                                type="password"
                                id="passwordRepeat"
                                aria-invalid={fieldState.invalid}
                                placeholder="Повторите пароль"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Button type="submit" className="w-full">
                    Зарегистрироваться
                </Button>
            </FieldGroup>
        </form>
    )
}
