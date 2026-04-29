import { Link } from "react-router-dom";
import {PAGE_URLS} from "@/shared/config/page-routes.ts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/shadcn/components/ui/card"
import PasswordResetForm from "@/features/auth/ui/PasswordResetForm"

export default function PasswordResetPage() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Сброс пароля</CardTitle>
                <CardDescription>Введите ваш email для получения инструкций по сбросу пароля</CardDescription>
            </CardHeader>
            <CardContent>
                <PasswordResetForm />
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
