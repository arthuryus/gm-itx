import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { passwordUpdateSchema, type PasswordUpdateSchema, passwordUpdateDefaultValues } from "@/features/account/schemas/password-update-schema.ts"
import { accountApi } from "@/features/account/api/account-api.ts"
import { useAuthStore } from "@/features/auth/store/auth-store.ts"

import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shadcn/components/ui/field"
import { Button } from "@/shadcn/components/ui/button"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/shadcn/components/ui/input-group"
import { Spinner } from "@/shadcn/components/ui/spinner"
import { Alert, AlertDescription } from "@/shadcn/components/ui/alert"
import { AlertCircleIcon, EyeOffIcon, EyeIcon } from "lucide-react"


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

    const [isCurrentPasswordShown, setIsCurrentPasswordShown] = useState(false)
    const [isNewPasswordShown, setIsNewPasswordShown] = useState(false)
    const [isNewPasswordConfirmShown, setIsNewPasswordConfirmShown] = useState(false)

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
                                        <InputGroupInput
                                            {...field}
                                            type={isCurrentPasswordShown ? "text" : "password"}
                                            id="currentPassword"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Введите текущий пароль"
                                            autoComplete="off"
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                                size="icon-xs"
                                                onClick={() => {
                                                    setIsCurrentPasswordShown((prev) => !prev)
                                                }}
                                            >
                                                {isCurrentPasswordShown ? <EyeIcon /> : <EyeOffIcon />}
                                            </InputGroupButton>
                                        </InputGroupAddon>
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
                                        <InputGroupInput
                                            {...field}
                                            type={isNewPasswordShown ? "password" : "text"}
                                            id="newPassword"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Введите новый пароль"
                                            autoComplete="off"
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                                size="icon-xs"
                                                onClick={() => {
                                                    setIsNewPasswordShown((prev) => !prev)
                                                }}
                                            >
                                                {isNewPasswordShown ? <EyeOffIcon /> : <EyeIcon />}
                                            </InputGroupButton>
                                        </InputGroupAddon>
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
                                        <InputGroupInput
                                            {...field}
                                            type={isNewPasswordConfirmShown ? "password" : "text"}
                                            id="newPasswordConfirm"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Повторите новый пароль"
                                            autoComplete="off"
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <InputGroupButton
                                                size="icon-xs"
                                                onClick={() => {
                                                    setIsNewPasswordConfirmShown((prev) => !prev)
                                                }}
                                            >
                                                {isNewPasswordConfirmShown ? <EyeOffIcon /> : <EyeIcon />}
                                            </InputGroupButton>
                                        </InputGroupAddon>
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
