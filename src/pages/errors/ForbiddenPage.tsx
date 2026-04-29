import {useNavigate, useLocation} from "react-router-dom";
import {PAGE_URLS} from "@/shared/config/page-routes.ts";
import {Button} from "@/shadcn/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shadcn/components/ui/card";
import {ArrowLeft, Home, AlertTriangle} from "lucide-react";

export default function ForbiddenPage() {
    const navigate = useNavigate()
    const location = useLocation()

    const title = (location.state as { title?: string })?.title || "Доступ запрещён"
    const message = (location.state as {
            message?: string
        })?.message || "У вас нет прав для доступа к этой странице. Обратитесь к администратору, если считаете, что это ошибка."

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <AlertTriangle className="h-16 w-16 text-destructive"/>
                </div>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription>{message}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                        if (window.history.length > 1) {
                            navigate(-1)
                        } else {
                            navigate(PAGE_URLS.home())
                        }
                    }}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Назад
                </Button>
                <Button
                    className="w-full"
                    onClick={() => navigate(PAGE_URLS.home())}
                >
                    <Home className="mr-2 h-4 w-4" />
                    На главную
                </Button>
            </CardContent>
        </Card>
    );
}
