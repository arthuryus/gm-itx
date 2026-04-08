import { useLocation } from "react-router-dom"
import { getMetadata } from "@/shared/helpers/get-metadata.ts"

export function useMetadata() {
    const location = useLocation()
    return getMetadata(location.pathname)
}