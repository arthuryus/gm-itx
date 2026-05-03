import { useState } from "react";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { handlerError } from "@/shared/api/error/handler-error.ts";
import { setupSchema, type SetupSchema, setupDefaultValues } from "@/features/auth/schemas/setup-schema.ts"
import { authApi } from "@/features/auth/api/auth-api.ts"
//import { useAuthStore } from "@/features/auth/store/auth-store.ts"
import { useAuthInit } from "@/features/auth/hooks/use-auth-init.ts"

import { Field, FieldError, FieldGroup, FieldLabel } from "@/shadcn/components/ui/field"
import { Button } from "@/shadcn/components/ui/button"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/shadcn/components/ui/input-group"
import { InputGroupPasswordInput } from "@/shared/components/ui/inputs/InputGroupPasswordInput.tsx"
import { Spinner } from "@/shadcn/components/ui/spinner"
import { Alert, AlertDescription } from "@/shadcn/components/ui/alert"
import { AlertCircleIcon, Mail, Lock} from "lucide-react"


export default function SetupForm() {
    const [enableAuthInit, setEnableAuthInit] = useState(false)
    //const mustSetup = useAuthStore((s) => s.mustSetup)
    const { isLoading: isLoadingAuth } = useAuthInit(enableAuthInit, true)

    const handleSetup = async (data: SetupSchema) => {
        try {
            await authApi.setup(data)
            setEnableAuthInit(true)
            //mustSetup(false)
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const form = useForm<SetupSchema>({
        resolver: zodResolver(setupSchema),
        defaultValues: setupDefaultValues,
        mode: 'onBlur',
    })

    return (
        <form onSubmit={form.handleSubmit(handleSetup)} noValidate>
            {form.formState.errors.root?.message && (
                <Alert variant="danger" className="mb-4">
                    <AlertCircleIcon />
                    <AlertDescription>
                        {form.formState.errors.root?.message}
                    </AlertDescription>
                </Alert>
            )}
            <FieldGroup>
                <Controller
                    name="newEmail"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="newEmail">Новый Email</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon align="inline-start">
                                    <InputGroupButton
                                        size="icon-xs"
                                    >
                                        <Mail />
                                    </InputGroupButton>
                                </InputGroupAddon>
                                <InputGroupInput
                                    {...field}
                                    type="email"
                                    id="newEmail"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Введите новый email"
                                    autoComplete="email"
                                />
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="currentPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="currentPassword">Текущий пароль</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon align="inline-start">
                                    <InputGroupButton
                                        size="icon-xs"
                                    >
                                        <Lock />
                                    </InputGroupButton>
                                </InputGroupAddon>
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
                                <InputGroupAddon align="inline-start">
                                    <InputGroupButton
                                        size="icon-xs"
                                    >
                                        <Lock />
                                    </InputGroupButton>
                                </InputGroupAddon>
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
                                <InputGroupAddon align="inline-start">
                                    <InputGroupButton
                                        size="icon-xs"
                                    >
                                        <Lock />
                                    </InputGroupButton>
                                </InputGroupAddon>
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
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || isLoadingAuth}>
                    {(form.formState.isSubmitting || isLoadingAuth) && (
                        <Spinner className="size-3" />
                    )}
                    Отправить
                </Button>
            </FieldGroup>
        </form>
    )
}
