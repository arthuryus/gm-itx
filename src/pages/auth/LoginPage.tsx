import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shadcn/components/ui/card"
import LoginForm from "@/features/auth/ui/LoginForm"

export default function LoginPage() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Вход</CardTitle>
                <CardDescription>Введите свои данные для доступа к системе</CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                    <span className="me-2">Нет аккаунта?</span>
                    <Link to="/signup" className="underline underline-offset-4 hover:text-primary">Зарегистрироваться</Link>
                </p>
            </CardFooter>
        </Card>
    )
}
