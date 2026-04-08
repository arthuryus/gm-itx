import { useNavigate } from "react-router-dom";
import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";

export default function NotFoundPage() {
  const navigate = useNavigate();

return (
    <Card className="w-full max-w-md mx-4">
      <CardHeader className="text-center">
        <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
        <CardTitle className="text-2xl">Page Not Found</CardTitle>
        <CardDescription>
          The page you're looking for doesn't exist or has been moved.
        </CardDescription>
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
