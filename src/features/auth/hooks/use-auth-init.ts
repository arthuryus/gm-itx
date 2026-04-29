import { useEffect, useState } from "react"
import { useAuthStore } from "@/features/auth/store/auth-store.ts"
import { authApi } from "@/features/auth/api/auth-api.ts"
//import { handlerError } from "@/shared/api/error/handler-error.ts";

export function useAuthInit(enabled: boolean = true, force: boolean = false) {
    const [isLoading, setIsLoading] = useState(true)
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    const login = useAuthStore((s) => s.login)

    useEffect(() => {
        if (!enabled) {
            setIsLoading(false)
            return
        }

        let isMounted = true

        const initializeAuth = async () => {console.log('initializeAuth: ');
            if (!isAuthenticated || force) {
                try {
                    const response = await authApi.me()
                    if (isMounted) {
                        response.data.authorities.permissions = [
                            'permission_employees', 'permission_employees_create', 'permission_employees_edit', 'permission_employees_delete', 'permission_employees_view',
                            'permission_groups', 'permission_groups_create', 'permission_groups_edit', 'permission_groups_delete', 'permission_groups_view',
                            'permission_roles', 'permission_roles_create', 'permission_roles_edit', 'permission_roles_delete', 'permission_roles_view'
                        ];
                        login(response.data)
                    }
                //} catch (error) {
                    //console.log("Auth initialization failed", error)
                    //handlerError(error)
                } finally {
                    if (isMounted) {
                        setIsLoading(false)
                    }
                }
            }
            if (isMounted) {
                setIsLoading(false)
            }
        }

        initializeAuth()

        return () => {
            isMounted = false
        }
    }, [enabled, isAuthenticated, login, force])

    return { isLoading, isAuthenticated }
}
