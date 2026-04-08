import { ApiError } from "@/shared/api/error/api-error.ts"
import { API_ERROR_CODES } from "@/shared/api/error/error-codes.ts"
import { toast } from "sonner"

export function handlerCriticalError(error: unknown): boolean {
    if (!(error instanceof ApiError)) {
        return false
    }
    /*if (!(error instanceof ApiError)) {
        toast.error("Unexpected error")
        return true
    }*/

    switch (error.code) {
        case API_ERROR_CODES.FORBIDDEN:
            toast.error(error.message || "Access denied")
            return true

        case API_ERROR_CODES.RESOURCE_NOT_FOUND:
            toast.error(error.message || "Resource not found")
            return true

        case API_ERROR_CODES.INTERNAL_ERROR:
            toast.error(error.message || "Server error")
            return true

        //default:
            //toast.error(error.message || "Something went wrong")
            //return true
    }

    return false
}