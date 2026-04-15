import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shadcn/components/ui/card"
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
        </Card>
    )
}
