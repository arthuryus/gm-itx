import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { passwordResetConfirmSchema, type PasswordResetConfirmSchema } from "@/features/auth/schemas/password-reset-confirm-schema.ts"
import { authApi } from "@/features/auth/api/auth-api.ts"
import { handlerError } from "@/shared/api/error/handler-error.ts";
import {PAGE_URLS} from "@/shared/config/page-routes.ts";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/shadcn/components/ui/field"
import { Button } from "@/shadcn/components/ui/button"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/shadcn/components/ui/input-group"
import { Spinner } from "@/shadcn/components/ui/spinner"
import { Alert, AlertDescription } from "@/shadcn/components/ui/alert"
import { AlertCircleIcon, Lock, EyeIcon, EyeOffIcon } from "lucide-react"
import { toast } from "sonner"

type PasswordResetConfirmFormProps = {
    token: string
}
/*interface PasswordResetConfirmFormProps {
    hash: string
}*/

export default function PasswordResetConfirmForm({token}: PasswordResetConfirmFormProps) {
    const navigate = useNavigate()

    const handlePasswordResetConfirm = async (data: PasswordResetConfirmSchema) => {
        try {
            await authApi.passwordResetConfirm(data)

            toast.success("Новый пароль установлен.")
            navigate(PAGE_URLS.login(), { replace: true })
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const form = useForm<PasswordResetConfirmSchema>({
        resolver: zodResolver(passwordResetConfirmSchema),
        defaultValues: {
            newPassword: "",
            newPasswordConfirm: "",
            token: token,
        }
    })

    const [isNewPasswordShown, setIsNewPasswordShown] = useState(false)
    const [isNewPasswordConfirmShown, setIsNewPasswordConfirmShown] = useState(false)

    return (
        <form onSubmit={form.handleSubmit(handlePasswordResetConfirm)} noValidate>
            {(form.formState.errors.token?.message || form.formState.errors.root?.message) && (
                <Alert variant="danger" className="mb-4">
                    <AlertCircleIcon />
                    <AlertDescription>
                        {form.formState.errors.token?.message || form.formState.errors.root?.message || "Ссылка для восстановления пароля неверная"}
                    </AlertDescription>
                </Alert>
            )}
            <FieldGroup>
                <Controller
                    name="newPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="newPassword">Новый пароль</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon align="inline-start">
                                    <InputGroupButton
                                        size="icon-xs"
                                    >
                                        <Lock />
                                    </InputGroupButton>
                                </InputGroupAddon>
                                <InputGroupInput
                                    {...field}
                                    type={isNewPasswordShown ? "text" : "password"}
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
                                        {isNewPasswordShown ? <EyeIcon /> : <EyeOffIcon />}
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
                                <InputGroupAddon align="inline-start">
                                    <InputGroupButton
                                        size="icon-xs"
                                    >
                                        <Lock />
                                    </InputGroupButton>
                                </InputGroupAddon>
                                <InputGroupInput
                                    {...field}
                                    type={isNewPasswordConfirmShown ? "text" : "password"}
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
                                        {isNewPasswordConfirmShown ? <EyeIcon /> : <EyeOffIcon />}
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
                    {(form.formState.isSubmitting) && (
                        <Spinner className="size-3" />
                    )}
                    Отправить
                </Button>
            </FieldGroup>
        </form>
    )
}
