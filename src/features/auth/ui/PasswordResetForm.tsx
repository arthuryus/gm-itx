import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { passwordResetSchema } from "@/features/auth/schemas/password-reset-schema.ts"
import type { PasswordResetSchema } from "@/features/auth/schemas/password-reset-schema.ts"
import { authApi } from "@/features/auth/api/auth-api.ts"
import { handlerError } from "@/shared/api/error/handler-error.ts";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/shadcn/components/ui/field"
import { Button } from "@/shadcn/components/ui/button"
import { Input } from "@/shadcn/components/ui/input"

export default function PasswordResetForm() {
    const doPasswordReset = async (data: PasswordResetSchema) => {
        try {
            await authApi.passwordReset(data)
        } catch (error) {
            handlerError(error, {form})
        }
    }

    const form = useForm<PasswordResetSchema>({
        resolver: zodResolver(passwordResetSchema),
        defaultValues: {
            email: "",
        }
    })

    return (
        <form onSubmit={form.handleSubmit(doPasswordReset)}>
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
                <Button type="submit" className="w-full">
                    Отправить
                </Button>
            </FieldGroup>
        </form>
    )
}
