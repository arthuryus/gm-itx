import { useEffect, useState } from "react"

export function useAppInit() {
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        let isMounted = true

        const initializeApp = async () => {

            if (isMounted) {
                setIsLoading(false)
            }
        }

        initializeApp()

        return () => {
            isMounted = false
        }
    }, [])

    return { isLoading }
}
