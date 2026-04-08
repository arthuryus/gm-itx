import { Navigate, useLocation } from "react-router-dom"
import { useCsrfInit } from "@/features/csrf/hooks/use-csrf-init.ts"
import { useAuthInit } from "@/features/auth/hooks/use-auth-init.ts"
import { useAccess, type AccessProps } from "@/features/access/hooks/use-access.ts"
import { Loader } from "@/shared/components/ui/loaders/Loader.tsx"

type AuthMode = "required" | "guest" | "optional"

interface AccessRouteProps extends AccessProps {
    children: React.ReactNode
    csrf?: boolean
    auth?: AuthMode
}

export function AccessRoute({
    children,
    csrf = false,
    auth = "optional",
    ...accessProps
}: AccessRouteProps) {
    const hasAccessProps =
        !!accessProps.permission ||
        !!accessProps.permissions?.length ||
        !!accessProps.role ||
        !!accessProps.roles?.length

    const needCsrf = csrf
    const needAuth = auth !== "optional" || hasAccessProps
    const needAccessCheck = hasAccessProps

    const { isLoading: isLoadingCsrf, hasCsrfToken } = useCsrfInit(needCsrf)
    const { isLoading: isLoadingAuth, isAuthenticated } = useAuthInit(needAuth)
    const hasAccess = useAccess(accessProps, needAccessCheck)
    const location = useLocation()

    if (isLoadingCsrf || isLoadingAuth) {
        return <Loader />
    }

    // 1. CSRF
    if (csrf && !hasCsrfToken) {
        return <Navigate to="/400" replace />
    }

    // 2. AUTH LOGIC
    if (auth === "required" && !isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />
    }

    if (auth === "guest" && isAuthenticated) {
        return <Navigate to={ location.state?.from || "/" } replace />
    }

    // 3. ACCESS LOGIC (permissions/roles)
    if (!hasAccess) {
        return <Navigate to="/403" replace state={{ from: location.pathname }} />
    }

    return children
}