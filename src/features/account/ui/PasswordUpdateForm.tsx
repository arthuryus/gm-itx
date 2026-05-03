import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { passwordUpdateSchema, type PasswordUpdateSchema, passwordUpdateDefaultValues } from "@/features/account/schemas/password-update-schema.ts"
import { accountApi } from "@/features/account/api/account-api.ts"
import { useAuthStore } from "@/features/auth/store/auth-store.ts"

import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shadcn/components/ui/field"
import { Button } from "@/shadcn/components/ui/button"
import { InputGroup } from "@/shadcn/components/ui/input-group"
import { InputGroupPasswordInput } from "@/shared/components/ui/inputs/InputGroupPasswordInput.tsx"
import { Spinner } from "@/shadcn/components/ui/spinner"
import { Alert, AlertDescription } from "@/shadcn/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"


export default function LoginForm() {
    //const user = useAuthStore((s) => s.user)
    const setUser = useAuthStore((s) => s.setUser)

    const handlePasswordUpdate = async (data: PasswordUpdateSchema) => {
        try {
            const response = await accountApi.passwordUpdate(data)
            setUser(response.data)
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const form = useForm<PasswordUpdateSchema>({
        resolver: zodResolver(passwordUpdateSchema),
        defaultValues: passwordUpdateDefaultValues
    })

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-xl">Password update</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(handlePasswordUpdate)} noValidate>
                    {form.formState.errors.root?.message && (
                        <Alert variant="danger" className="mb-4">
                            <AlertCircleIcon />
                            <AlertDescription>
                                {form.formState.errors.root.message}
                            </AlertDescription>
                        </Alert>
                    )}
                    <FieldGroup>
                        <Controller
                            name="currentPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="currentPassword">Текущий пароль</FieldLabel>
                                    <InputGroup>
                                        <InputGroupPasswordInput
                                            {...field}
                                            id="currentPassword"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Введите текущий пароль"
                                            autoComplete="current-password"
                                        />
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="newPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="newPassword">Новый пароль</FieldLabel>
                                    <InputGroup>
                                        <InputGroupPasswordInput
                                            {...field}
                                            id="newPassword"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Введите новый пароль"
                                            autoComplete="new-password"
                                        />
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="newPasswordConfirm"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="newPasswordConfirm">Подтвердите новый пароль</FieldLabel>
                                    <InputGroup>
                                        <InputGroupPasswordInput
                                            {...field}
                                            id="newPasswordConfirm"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Повторите новый пароль"
                                            autoComplete="new-password"
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
                            Войти
                        </Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
