import { useNavigate } from "react-router-dom";
import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-md mx-4">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>
        <CardTitle className="text-2xl">Access Forbidden</CardTitle>
        <CardDescription>
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
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
          onClick={() => navigate('/dashboard')}
          className="w-full"
        >
          Go to Dashboard
        </Button>
      </CardContent>
    </Card>
  );
}
