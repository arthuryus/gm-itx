import type { NavigateFunction } from "react-router-dom";
import type { UseFormReturn, FieldValues } from "react-hook-form"
import type { ApiError } from "@/shared/api/error/api-error.ts"
import { errorNormalizer } from "@/shared/api/error/error-normalizer.ts"
import { isAuthError, isFormError, isCriticalError } from "@/shared/api/error/error-classifier.ts"
import { handlerFormError } from "@/shared/api/error/handler-form-error.ts"
import { handlerCriticalError } from "@/shared/api/error/handler-critical-error.ts"
import { toast } from "sonner"

type ErrorHandlerOptions<T extends FieldValues = FieldValues> = {
    override?: (error: ApiError) => boolean | void
    form?: UseFormReturn<T>
    navigate?: NavigateFunction
}

export function handlerError<T extends FieldValues = FieldValues>(
    error: unknown,
    options?: ErrorHandlerOptions<T>
): void {
    const e = errorNormalizer(error)

    // 1. auth errors (уже обработаны в client.ts)
    if (isAuthError(e)) {
        return
    }

    // 2. custom override (самый высокий приоритет)
    if (options?.override) {
        const handled = options.override(e)
        if (handled) return
    }

    // 3. form errors (если передали form)
    if (isFormError(e) && options?.form) {
        const handled = handlerFormError(e, options.form)
        if (handled) return
    }

    // 4. global errors
    if (isCriticalError(e)) {
        const handled = handlerCriticalError(e, options?.navigate)
        if (handled) return
    }

    // 5. fallback
    //handlerCriticalError(e)
    toast.error(e.message || "Something went wrong")
}

/*
1) React Query
mutations: {
  onError: (error) => handlerError(error),
},
queries: {
  onError: (error) => handlerError(error),
}

2) форма (React Hook Form)
try {
  await mutation.mutateAsync(data)
} catch (e) {
  handlerError(e, { form })
}

3) direct API
try {
  await authApi.login(data)
} catch (e) {
  handlerError(e, { form })
}

4) custom кейс
handlerError(error, {
  override: (e) => {
    if (e.code === "EMAIL_NOT_VERIFIED") {
      openVerifyModal()
      return true
    }
  },
})


authApi.me()
    .then(res => {
        login(res.data)
    })
    .catch((error) => {
        handlerError(error)
    })
*/