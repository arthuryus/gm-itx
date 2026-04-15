import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/shadcn/components/ui/card"
import { Button } from "@/shadcn/components/ui/button"
import SetupForm from "@/features/auth/ui/SetupForm"
import { authApi } from "@/features/auth/api/auth-api.ts"
import { useAuthStore } from "@/features/auth/store/auth-store.ts";

export default function SetupPage() {
    const logout = useAuthStore((s) => s.logout)

    const handleLogout = async () => {
        try {
            await authApi.logout()
            logout()
        } catch (error) {
            console.log("Setup logout error", error)
            //handlerError(error)
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Первый вход</CardTitle>
                <CardDescription>Установите новый email и пароль</CardDescription>
            </CardHeader>
            <CardContent>
                <SetupForm />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                    <span className="me-2">Не тот аккаунт?</span>
                    <Button
                        onClick={handleLogout}
                        variant="link"
                        className="p-0 h-auto font-normal text-muted-foreground underline underline-offset-4 hover:text-primary"
                    >
                        Выйти
                    </Button>
                </p>
            </CardFooter>
        </Card>
    )
}
