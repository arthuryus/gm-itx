import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { emailUpdateSchema, type EmailUpdateSchema } from "@/features/account/schemas/email-update-schema.ts"
import { accountApi } from "@/features/account/api/account-api.ts"
import { useAuthStore } from "@/features/auth/store/auth-store.ts"

import { Card, CardHeader, CardTitle, CardContent } from "@/shadcn/components/ui/card"
import { Field, FieldLabel, FieldError, FieldGroup } from "@/shadcn/components/ui/field"
import { Button } from "@/shadcn/components/ui/button"
import { Input } from "@/shadcn/components/ui/input"
import { Spinner } from "@/shadcn/components/ui/spinner"
import { Alert, AlertDescription } from "@/shadcn/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"


export default function EmailUpdateForm() {
    const user = useAuthStore((s) => s.user)
    const setUser = useAuthStore((s) => s.setUser)

    const handleEmailUpdate = async (data: EmailUpdateSchema) => {
        try {
            const response = await accountApi.emailUpdate(data)
            setUser(response.data)
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const form = useForm<EmailUpdateSchema>({
        resolver: zodResolver(emailUpdateSchema),
        defaultValues: {
            email: user?.email,
        }
    })

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-xl">Email update</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(handleEmailUpdate)} noValidate>
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
                                        autoComplete="email"
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
