//import { useNavigate } from "react-router-dom";
import { type NavigateFunction } from "react-router-dom";
import { ApiError } from "@/shared/api/error/api-error.ts"
import { API_ERROR_CODES } from "@/shared/api/error/error-codes.ts"
import { toast } from "sonner"

export function handlerCriticalError(
    error: unknown,
    navigate?: NavigateFunction
    //navigate: (to: string, options?: { replace?: boolean }) => void
): boolean {

    if (!(error instanceof ApiError)) {
        return false
    }
    /*if (!(error instanceof ApiError)) {
        toast.error("Unexpected error")
        return true
    }*/

    switch (error.code) {
        //case API_ERROR_CODES.PASSWORD_RESET_TOKEN_INVALID:
        case API_ERROR_CODES.BAD_REQUEST:
            if (navigate) {
                navigate("/400", { replace: true, state: { message: error.message } })
            } else {
                toast.error(error.message || "Bad request")
            }
            return true

        case API_ERROR_CODES.FORBIDDEN:
            toast.error(error.message || "Access denied")
            return true

        case API_ERROR_CODES.NOT_FOUND:
            if (navigate) {
                navigate("/404", { replace: true, state: { message: error.message } })
            } else {
                toast.error(error.message || "Resource not found")
            }
            return true

        case API_ERROR_CODES.INTERNAL_ERROR:
            toast.error(error.message || "Server error")
            return true

        case API_ERROR_CODES.SERVICE_UNAVAILABLE:
            toast.error(error.message || "Service unavailable")
            return true

        case API_ERROR_CODES.RATE_LIMITED:
            toast.error(error.message || "Rate limited")
            return true

        //default:
            //toast.error(error.message || "Something went wrong")
            //return true
    }

    return false
}