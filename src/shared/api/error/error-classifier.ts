import { API_ERROR_CODES, type ApiErrorCode } from "@/shared/api/error/error-codes.ts"
import type { ApiError } from "@/shared/api/error/api-error.ts"


const AUTH_ERRORS: Set<ApiErrorCode> = new Set([
    API_ERROR_CODES.ACCESS_TOKEN_EXPIRED,
    API_ERROR_CODES.ACCESS_TOKEN_INVALID,
    API_ERROR_CODES.REFRESH_TOKEN_INVALID,
    API_ERROR_CODES.CSRF_INVALID,
])

const FORM_ERRORS: Set<ApiErrorCode> = new Set([
    API_ERROR_CODES.VALIDATION_ERROR,
    API_ERROR_CODES.INVALID_CREDENTIALS,
])

const CRITICAL_ERRORS: Set<ApiErrorCode>= new Set([
    API_ERROR_CODES.BAD_REQUEST,
    API_ERROR_CODES.FORBIDDEN,
    API_ERROR_CODES.RESOURCE_NOT_FOUND,
    API_ERROR_CODES.INTERNAL_ERROR,
    API_ERROR_CODES.SERVICE_UNAVAILABLE,
])



export function isAuthError(error: ApiError): boolean {
    return AUTH_ERRORS.has(error.code)
}

export function isFormError(error: ApiError): boolean {
    return FORM_ERRORS.has(error.code)
}

export function isCriticalError(error: ApiError): boolean {
    return CRITICAL_ERRORS.has(error.code)
}