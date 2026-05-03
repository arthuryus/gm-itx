import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { profileUpdateSchema, type ProfileUpdateSchema } from "@/features/account/schemas/profile-update-schema.ts"
import { accountApi } from "@/features/account/api/account-api.ts"
import { useAuthStore } from "@/features/auth/store/auth-store.ts"

import { Card, CardHeader, CardTitle, CardContent } from "@/shadcn/components/ui/card"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/shadcn/components/ui/field"
import { Button } from "@/shadcn/components/ui/button"
import { Input } from "@/shadcn/components/ui/input"
import { Spinner } from "@/shadcn/components/ui/spinner"
import { Alert, AlertDescription } from "@/shadcn/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"


export default function ProfileUpdateForm() {
    const user = useAuthStore((s) => s.user)
    const setUser = useAuthStore((s) => s.setUser)

    const handleProfileUpdate = async (data: ProfileUpdateSchema) => {
        try {
            const response = await accountApi.profileUpdate(data)
            setUser(response.data)
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const form = useForm<ProfileUpdateSchema>({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
        }
    })

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-xl">Profile update</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(handleProfileUpdate)} noValidate>
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
                            name="firstName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="firstName">Имя</FieldLabel>
                                    <Input
                                        {...field}
                                        type="text"
                                        id="firstName"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Введите ваше имя"
                                        autoComplete="given-name"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="lastName">Фамилия</FieldLabel>
                                    <Input
                                        {...field}
                                        type="text"
                                        id="lastName"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Введите вашу фамилию"
                                        autoComplete="family-name"
                                    />
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
                            Сохранить
                        </Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
