import {useNavigate, useLocation} from "react-router-dom"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shadcn/components/ui/card"
import {Button} from "@/shadcn/components/ui/button"

export default function NotFoundPage() {
    const navigate = useNavigate()
    const location = useLocation()

    const title = (location.state as { title?: string })?.title || "Page Not Found"
    const message = (location.state as {
        message?: string
    })?.message || "The page you're looking for doesn't exist or has been moved."

    return (
        <Card className="w-full max-w-md mx-4">
            <CardHeader className="text-center">
                <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription>{message}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Button
                    onClick={() => navigate(-1)}
                    variant="outline"
                    className="w-full"
                >
                    Go Back
                </Button>
                <Button
                    onClick={() => navigate('/')}
                    className="w-full"
                >
                    Go Home
                </Button>
            </CardContent>
        </Card>
    );
}
