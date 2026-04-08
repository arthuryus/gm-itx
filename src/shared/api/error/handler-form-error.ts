import type { UseFormReturn, FieldValues, Path } from "react-hook-form"
import { ApiError, type ApiErrorData } from "@/shared/api/error/api-error.ts"
import { API_ERROR_CODES } from "@/shared/api/error/error-codes.ts"

export function handlerFormError<T extends FieldValues>(
    error: unknown,
    form: UseFormReturn<T>
): boolean {
    if (!(error instanceof ApiError)) {
        return false
    }

    const data = error.data as ApiErrorData

    switch (error.code) {
        case API_ERROR_CODES.VALIDATION_ERROR:
        case API_ERROR_CODES.INVALID_CREDENTIALS:
            if (data?.message) {
                form.setError("root", {
                    type: "server",
                    message: data.message as string,
                })
            }

            if (data?.errors) {
                const errors = data.errors

                Object.entries(errors).forEach(([field, msg]) => {
                    form.setError(field as Path<T>, {
                        type: "server",
                        message: msg as string,
                    })
                })
            }

            return true
    }

    return false
}