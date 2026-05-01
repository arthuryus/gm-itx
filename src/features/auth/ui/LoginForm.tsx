import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { loginSchema, type LoginSchema, loginDefaultValues } from "@/features/auth/schemas/login-schema.ts"
import { authApi } from "@/features/auth/api/auth-api.ts"
import { useAuthStore } from "@/features/auth/store/auth-store.ts"
import {PAGE_URLS} from "@/shared/config/page-routes.ts";
import { PERMISSIONS } from "@/shared/config/permissions.ts"

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
                PERMISSIONS.PERMISSION_EMPLOYEES, PERMISSIONS.PERMISSION_EMPLOYEES_CREATE, PERMISSIONS.PERMISSION_EMPLOYEES_EDIT, PERMISSIONS.PERMISSION_EMPLOYEES_DELETE, PERMISSIONS.PERMISSION_EMPLOYEES_VIEW,
                PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS, PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_CREATE, PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_EDIT, PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_DELETE, PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_VIEW,
                PERMISSIONS.PERMISSION_EMPLOYEE_ROLES, PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_CREATE, PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_EDIT, PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_DELETE, PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_VIEW,

                PERMISSIONS.PERMISSION_CUSTOMERS, PERMISSIONS.PERMISSION_CUSTOMERS_CREATE, PERMISSIONS.PERMISSION_CUSTOMERS_EDIT, PERMISSIONS.PERMISSION_CUSTOMERS_DELETE, PERMISSIONS.PERMISSION_CUSTOMERS_VIEW,
                PERMISSIONS.PERMISSION_CUSTOMER_GROUPS, PERMISSIONS.PERMISSION_CUSTOMER_GROUPS_CREATE, PERMISSIONS.PERMISSION_CUSTOMER_GROUPS_EDIT, PERMISSIONS.PERMISSION_CUSTOMER_GROUPS_DELETE, PERMISSIONS.PERMISSION_CUSTOMER_GROUPS_VIEW,
                PERMISSIONS.PERMISSION_CUSTOMER_ROLES, PERMISSIONS.PERMISSION_CUSTOMER_ROLES_CREATE, PERMISSIONS.PERMISSION_CUSTOMER_ROLES_EDIT, PERMISSIONS.PERMISSION_CUSTOMER_ROLES_DELETE, PERMISSIONS.PERMISSION_CUSTOMER_ROLES_VIEW,
            ]

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
                                    to={PAGE_URLS.passwordReset()}
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
