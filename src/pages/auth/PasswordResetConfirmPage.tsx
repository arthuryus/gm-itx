import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { type PasswordResetValidateSchema } from "@/features/auth/schemas/password-reset-validate-schema.ts"
import { authApi } from "@/features/auth/api/auth-api.ts"
import { handlerError } from "@/shared/api/error/handler-error.ts";
import {PAGE_URLS} from "@/shared/config/page-routes.ts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/shadcn/components/ui/card"
import PasswordResetConfirmForm from "@/features/auth/ui/PasswordResetConfirmForm"
import { Loader } from "@/shared/components/ui/loaders/Loader"

export default function PasswordResetConfirmPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") ?? "";

    const [isLoading, setIsLoading] = useState(true)
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        const handlePasswordResetValidate = async () => {
            try {
                const data: PasswordResetValidateSchema = { token }
                await authApi.passwordResetValidate(data)

                setIsValid(true)
            } catch (error) {
                handlerError(error, {navigate})
            } finally {
                setIsLoading(false)
            }
        }

        handlePasswordResetValidate()
    }, [token, navigate])

    if (isLoading) {
        return <Loader />
    }

    if (!isValid) {
        return null
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Создание нового пароля</CardTitle>
                <CardDescription>Придумайте новый пароль и подтвердите его</CardDescription>
            </CardHeader>
            <CardContent>
                <PasswordResetConfirmForm token={token} />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                    <span className="me-2">Помните пароль?</span>
                    <Link to={PAGE_URLS.login()} className="underline underline-offset-4 hover:text-primary">Войти</Link>
                </p>
            </CardFooter>
        </Card>
    )
}
