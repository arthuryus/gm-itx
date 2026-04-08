import { useEffect, useState } from "react"
import { useAuthStore } from "@/features/auth/store/auth-store.ts"
import { authApi } from "@/features/auth/api/auth-api.ts"
//import {handlerError} from "@/shared/api/handler-error.ts";

export function useAuthInit(enabled: boolean = true) {
    const [isLoading, setIsLoading] = useState(true)
    const isAuthenticated = useAuthStore(s => s.isAuthenticated)
    const login = useAuthStore(s => s.login)

    useEffect(() => {
        if (!enabled) {
            setIsLoading(false)
            return
        }

        let isMounted = true

        const initializeAuth = async () => {
            if (!isAuthenticated) {
                try {
                    const response = await authApi.me()
                    if (isMounted) {
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
    }, [enabled, isAuthenticated, login])

    return { isLoading, isAuthenticated }
}
