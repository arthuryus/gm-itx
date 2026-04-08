import { API_ERROR_CODES } from "@/shared/api/error/error-codes.ts"
import type { ApiErrorCode } from "@/shared/api/error/error-codes.ts"

export type ApiErrorData = {
    message?: string
    errors?: Record<string, string>
}
type ApiErrorOptions = {
    code?: ApiErrorCode
    message?: string
    data?: ApiErrorData
    status?: number
}

export class ApiError extends Error {
    code: ApiErrorCode
    data?: ApiErrorData
    status?: number

    constructor(options: ApiErrorOptions = {}) {
        super(options.message || "API Error")

        this.name = "ApiError"
        this.code = options.code || API_ERROR_CODES.UNKNOWN
        this.data = options.data
        this.status = options.status

        Object.setPrototypeOf(this, ApiError.prototype)
    }
}

export function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError
}