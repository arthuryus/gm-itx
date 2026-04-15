import { useEffect, useState } from "react"
import { APP } from "@/shared/config/main.ts";
import Cookies from "js-cookie"
import { csrfApi } from "@/features/csrf/api/csrf-api.ts"
//import { handlerError } from "@/shared/api/error/handler-error.ts";

export function useCsrfInit(enabled: boolean = true) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasCsrfToken, setHasCsrfToken] = useState(!!Cookies.get(APP.CSRF_COOKIE_NAME))

    useEffect(() => {
        if (!enabled) {
            setIsLoading(false)
            return
        }

        let isMounted = true

        const initializeCsrf = async () => {
            if (!hasCsrfToken) {
                try {
                    await csrfApi.csrf()
                    if (isMounted) {
                        setHasCsrfToken(true)
                    }
                //} catch (error) {
                    //console.log("CSRF initialization failed", error)
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

        initializeCsrf()

        return () => {
            isMounted = false
        }
    }, [enabled, hasCsrfToken])

    return { isLoading, hasCsrfToken }
}
