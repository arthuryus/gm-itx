import { Navigate, useLocation } from "react-router-dom"
import { useCsrfInit } from "@/features/csrf/hooks/use-csrf-init.ts"
import { useAuthInit } from "@/features/auth/hooks/use-auth-init.ts"
import { useSetupInit } from "@/features/auth/hooks/use-setup-init.ts"
import { useAccess, type AccessProps } from "@/features/access/hooks/use-access.ts"
import { Loader } from "@/shared/components/ui/loaders/Loader.tsx"

export const AUTH_MODES = {
    REQUIRED: "required",
    GUEST: "guest",
    OPTIONAL: "optional"
} as const

type AuthMode = typeof AUTH_MODES[keyof typeof AUTH_MODES]

export const SETUP_MODES = {
    REQUIRED: "required",
    GUEST: "guest",
    OPTIONAL: "optional"
} as const

type SetupMode = typeof SETUP_MODES[keyof typeof SETUP_MODES]

interface AccessRouteProps extends AccessProps {
    children: React.ReactNode
    csrf?: boolean
    auth?: AuthMode
    setup?: SetupMode
}

export function AccessRoute({
    children,
    csrf = false,
    auth = AUTH_MODES.OPTIONAL,
    setup = SETUP_MODES.OPTIONAL,
    ...accessProps
}: AccessRouteProps) {
    const hasAccessProps =
        !!accessProps.permission ||
        !!accessProps.permissions?.length ||
        !!accessProps.role ||
        !!accessProps.roles?.length

    const needCsrf = csrf
    const needAuth = auth !== AUTH_MODES.OPTIONAL || hasAccessProps
    const needSetup = setup !== SETUP_MODES.OPTIONAL
    const needAccessCheck = hasAccessProps

    const { isLoading: isLoadingCsrf, hasCsrfToken } = useCsrfInit(needCsrf)
    const { isLoading: isLoadingAuth, isAuthenticated } = useAuthInit(needAuth)
    const { mustSetup } = useSetupInit(needSetup)
    const hasAccess = useAccess(accessProps, needAccessCheck)
    const location = useLocation()

    if (isLoadingCsrf || isLoadingAuth) {
        return <Loader />
    }

    // 1. CSRF
    if (csrf && !hasCsrfToken) {
        return <Navigate to="/400" replace />
    }

    // SETUP LOGIC (other pages: /login, /password-reset, /password-reset-confirm, + internal pages)
    if (setup === SETUP_MODES.REQUIRED && mustSetup) { //console.log('SETUP_MODES.REQUIRED: /setup', mustSetup, location.pathname);
        return <Navigate to="/setup" replace />
    }

    // SETUP LOGIC (page: /setup)
    if (setup === SETUP_MODES.GUEST && !mustSetup) { //console.log('SETUP_MODES.GUEST: /login', mustSetup, location.pathname);
        return <Navigate to="/login" replace />
    }

    // AUTH LOGIC (internal pages)
    if (auth === AUTH_MODES.REQUIRED && !isAuthenticated) { //console.log('AUTH_MODES.REQUIRED: /setup', isAuthenticated, location.pathname);
        return <Navigate to="/login" replace state={{ from: location.pathname }} />
    }

    // AUTH LOGIC (external pages)
    if (auth === AUTH_MODES.GUEST && isAuthenticated) { //console.log('AUTH_MODES.GUEST: /setup', isAuthenticated, location.pathname);
        return <Navigate to={ location.state?.from || "/" } replace />
    }

    // ACCESS LOGIC (permissions/roles)
    if (!hasAccess) {
        return <Navigate to="/403" replace state={{ from: location.pathname }} />
    }

    return children
}