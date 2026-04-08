import axios, { AxiosError } from "axios"
import { ApiError, type ApiErrorData } from "@/shared/api/error/api-error.ts"
import { API_ERROR_CODES } from "@/shared/api/error/error-codes.ts"
import type { ApiErrorCode } from "@/shared/api/error/error-codes.ts"

type BackendErrorResponse = {
    code?: ApiErrorCode
    message?: string
    errors?: Record<string, string>
    [key: string]: unknown
}

function errorDataNormalizer(data?: BackendErrorResponse): ApiErrorData | undefined {
    if (!data) return undefined

    const normalized: ApiErrorData = {
        ...(data.message !== undefined && { message: data.message }),
        ...(data.errors !== undefined && { errors: data.errors }),
    }

    return Object.keys(normalized).length > 0 ? normalized : undefined
}

export function errorNormalizer(error: unknown): ApiError {
    // уже нормализована
    if (error instanceof ApiError) {
        return error
    }

    // axios ошибка
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<BackendErrorResponse>

        const status = axiosError.response?.status
        const data = axiosError.response?.data

        // backend прислал нормальный формат
        if (data && typeof data === "object") {
            return new ApiError({
                code: data.code || API_ERROR_CODES.UNKNOWN,
                message: data.message || axiosError.message,
                data: errorDataNormalizer(data),
                status,
            })
        }

        // нет data (например status: 500, но без code: INTERNAL_ERROR)
        return new ApiError({
            code: API_ERROR_CODES.UNKNOWN,
            message: axiosError.message,
            status,
        })
    }

    // вообще неизвестная ошибка
    return new ApiError({
        code: API_ERROR_CODES.UNKNOWN,
        message: "Unexpected error",
    })
}