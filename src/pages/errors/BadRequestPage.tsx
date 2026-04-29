import {useNavigate, useLocation} from "react-router-dom"
import {PAGE_URLS} from "@/shared/config/page-routes.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shadcn/components/ui/card"
import {Button} from "@/shadcn/components/ui/button"
import {ArrowLeft, Home} from "lucide-react";

export default function BadRequestPage() {
    const navigate = useNavigate()
    const location = useLocation()

    const title = (location.state as { title?: string })?.title || "Неверный запрос"
    const message = (location.state as { message?: string })?.message || "Переданные данные некорректны или не могут быть обработаны."

    return (
        <Card className="w-full max-w-md mx-4">
            <CardHeader className="text-center">
                <div className="text-6xl font-bold text-gray-300 mb-4">400</div>
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
