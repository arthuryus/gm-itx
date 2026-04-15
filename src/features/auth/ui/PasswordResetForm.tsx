import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { passwordResetSchema, type PasswordResetSchema, passwordResetDefaultValues } from "@/features/auth/schemas/password-reset-schema.ts"
import { authApi } from "@/features/auth/api/auth-api.ts"
import { handlerError } from "@/shared/api/error/handler-error.ts";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/shadcn/components/ui/field"
import { Button } from "@/shadcn/components/ui/button"
import { Spinner } from "@/shadcn/components/ui/spinner"
import { Alert, AlertDescription } from "@/shadcn/components/ui/alert"
import { XCircle, CheckCircle, Mail } from "lucide-react"
import { InputGroup, InputGroupInput, InputGroupButton, InputGroupAddon } from "@/shadcn/components/ui/input-group.tsx";

export default function PasswordResetForm() {
    const [isSent, setIsSent] = useState(false)
    const handlePasswordReset = async (data: PasswordResetSchema) => {
        try {
            await authApi.passwordReset(data)
            setIsSent(true)
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const form = useForm<PasswordResetSchema>({
        resolver: zodResolver(passwordResetSchema),
        defaultValues: passwordResetDefaultValues
    })

    return (
        <form onSubmit={form.handleSubmit(handlePasswordReset)} noValidate>
            {isSent && (
                <Alert variant="success" className="mb-4">
                    <CheckCircle />
                    <AlertDescription>
                        Ваш запрос на восстановление пароля отправлен. Проверьте вашу почту.
                    </AlertDescription>
                </Alert>
            )}
            {form.formState.errors.root?.message && (
                <Alert variant="danger" className="mb-4">
                    <XCircle />
                    <AlertDescription>
                        {form.formState.errors.root.message}
                    </AlertDescription>
                </Alert>
            )}
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="group">
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon align="inline-start">
                                    <InputGroupButton
                                        size="icon-xs"
                                    >
                                        <Mail className="text-muted-foreground group-data-[invalid=true]:text-destructive" />
                                    </InputGroupButton>
                                </InputGroupAddon>
                                <InputGroupInput
                                    {...field}
                                    type="email"
                                    id="email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Введите email"
                                    autoComplete="off"
                                />
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && (
                        <Spinner className="size-3" />
                    )}
                    Отправить
                </Button>
            </FieldGroup>
        </form>
    )
}
