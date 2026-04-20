import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { loginSchema, type LoginSchema, loginDefaultValues } from "@/features/auth/schemas/login-schema.ts"
import { authApi } from "@/features/auth/api/auth-api.ts"
import { useAuthStore } from "@/features/auth/store/auth-store.ts"

//import { useNavigate, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shadcn/components/ui/field"
import { Button } from "@/shadcn/components/ui/button"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/shadcn/components/ui/input-group"
import { Spinner } from "@/shadcn/components/ui/spinner"
import { Alert, AlertDescription } from "@/shadcn/components/ui/alert"
import { AlertCircleIcon, Mail, Lock, EyeOffIcon, EyeIcon } from "lucide-react"


export default function LoginForm() {
    const login = useAuthStore((s) => s.login)
    //const location = useLocation();
    //const navigate = useNavigate();

    const handleLogin = async (data: LoginSchema) => {
        try {
            const response = await authApi.login(data)
            response.data.authorities.permissions = [
                'permission_employees', 'permission_employees_create', 'permission_employees_edit', 'permission_employees_delete', 'permission_employees_view',
                'permission_groups', 'permission_groups_create', 'permission_groups_edit', 'permission_groups_delete', 'permission_groups_view',
            ];
            login(response.data)

            //const from = location.state?.from || "/";
            //navigate(from, { replace: true })
        } catch (error) {
            handlerError(error, { form })
        }
    }

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: loginDefaultValues
    })

    const [isPasswordShown, setIsPasswordShown] = useState(false)

    return (
        <form onSubmit={form.handleSubmit(handleLogin)} noValidate>
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
                                    type={isPasswordShown ? "text" : "password"}
                                    id="password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Введите пароль"
                                    autoComplete="off"
                                />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                        size="icon-xs"
                                        onClick={() => {
                                            setIsPasswordShown((prev) => !prev)
                                        }}
                                    >
                                        {isPasswordShown ? <EyeIcon /> : <EyeOffIcon />}
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
    )
}
