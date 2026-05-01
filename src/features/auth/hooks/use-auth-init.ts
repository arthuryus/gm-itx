import { useEffect, useState } from "react"
import { useAuthStore } from "@/features/auth/store/auth-store.ts"
import { authApi } from "@/features/auth/api/auth-api.ts"
import { PERMISSIONS } from "@/shared/config/permissions.ts"
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
                            PERMISSIONS.PERMISSION_EMPLOYEES, PERMISSIONS.PERMISSION_EMPLOYEES_CREATE, PERMISSIONS.PERMISSION_EMPLOYEES_EDIT, PERMISSIONS.PERMISSION_EMPLOYEES_DELETE, PERMISSIONS.PERMISSION_EMPLOYEES_VIEW,
                            PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS, PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_CREATE, PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_EDIT, PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_DELETE, PERMISSIONS.PERMISSION_EMPLOYEE_GROUPS_VIEW,
                            PERMISSIONS.PERMISSION_EMPLOYEE_ROLES, PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_CREATE, PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_EDIT, PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_DELETE, PERMISSIONS.PERMISSION_EMPLOYEE_ROLES_VIEW,

                            PERMISSIONS.PERMISSION_CUSTOMERS, PERMISSIONS.PERMISSION_CUSTOMERS_CREATE, PERMISSIONS.PERMISSION_CUSTOMERS_EDIT, PERMISSIONS.PERMISSION_CUSTOMERS_DELETE, PERMISSIONS.PERMISSION_CUSTOMERS_VIEW,
                            PERMISSIONS.PERMISSION_CUSTOMER_GROUPS, PERMISSIONS.PERMISSION_CUSTOMER_GROUPS_CREATE, PERMISSIONS.PERMISSION_CUSTOMER_GROUPS_EDIT, PERMISSIONS.PERMISSION_CUSTOMER_GROUPS_DELETE, PERMISSIONS.PERMISSION_CUSTOMER_GROUPS_VIEW,
                            PERMISSIONS.PERMISSION_CUSTOMER_ROLES, PERMISSIONS.PERMISSION_CUSTOMER_ROLES_CREATE, PERMISSIONS.PERMISSION_CUSTOMER_ROLES_EDIT, PERMISSIONS.PERMISSION_CUSTOMER_ROLES_DELETE, PERMISSIONS.PERMISSION_CUSTOMER_ROLES_VIEW,
                        ]

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
