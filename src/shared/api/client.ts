import axios, { AxiosError, type AxiosRequestConfig } from "axios"
import { APP } from "@/shared/config/main.ts";
import { API_ERROR_CODES } from "@/shared/api/error/error-codes.ts"
import { errorNormalizer } from "@/shared/api/error/error-normalizer.ts"
import { authApi } from "@/features/auth/api/auth-api.ts"
import { csrfApi } from "@/features/csrf/api/csrf-api.ts"
import { useAuthStore } from "@/features/auth/store/auth-store.ts"
import Cookies from "js-cookie"


type FailedQueueItem = {
    resolve: (value?: unknown) => void
    reject: (reason: unknown) => void
}

/**
 * Очередь для обработки запросов, пока не будет обновлен access-token
 */
let isAccessTokenRefreshing: boolean = false
let accessTokenFailedQueue: FailedQueueItem[] = []
const accessTokenProcessQueue = (error: unknown) => {
    accessTokenFailedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error)
        } else {
            resolve()
        }
    })

    accessTokenFailedQueue = []
}

/**
 * Очередь для обработки запросов, пока не будет обновлен csrf-token
 */
let isCsrfTokenRefreshing: boolean = false
let csrfTokenFailedQueue: FailedQueueItem[] = []
const csrfTokenProcessQueue = (error: unknown) => {
    csrfTokenFailedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error)
        } else {
            resolve()
        }
    })

    csrfTokenFailedQueue = []
}

/**
 * Экземпляр axios-а для отправки запросов на обновление access-token и csrf-token
 */
export const apiRefresh = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_PATH,
    withCredentials: true,
})

/**
 * Экземпляр axios-а для отправки запросов на все остальные endpoints
 */
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_PATH,
    withCredentials: true,
})

/**
 * Перед отправкой запроса к заголовкам добавляется специальный заголовок.
 */
api.interceptors.request.use((config) => {
    if (typeof config.method === "string" && ["POST", "PUT", "PATCH", "DELETE"].includes(config.method.toUpperCase())) {
        const csrfToken = Cookies.get(APP.CSRF_COOKIE_NAME)

        if (csrfToken) {
            config.headers[APP.CSRF_HEADER_NAME] = csrfToken
        }
    }

    return config
})

/**
 * После получения ответа с ошибками
 * ACCESS_TOKEN_EXPIRED, ACCESS_TOKEN_INVALID, REFRESH_TOKEN_INVALID, CSRF_INVALID
 * организует переотправки запросов на обновление access-token и csrf-token
 * либо делает logout()
 */
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as | (AxiosRequestConfig & { _retry?: boolean }) | undefined

        const apiError = errorNormalizer(error)

        if (!originalRequest) {
            throw apiError
        }

        const { logout } = useAuthStore.getState()

        switch (apiError.code) {

            case API_ERROR_CODES.CSRF_INVALID:

                if (!originalRequest._retry) {
                    originalRequest._retry = true

                    if (isCsrfTokenRefreshing) {
                        return new Promise((resolve, reject) => {
                            csrfTokenFailedQueue.push({ resolve, reject })
                        })
                            .then(() => api(originalRequest))
                            .catch((err) => {
                                const normalizedErr = errorNormalizer(err)
                                Promise.reject(normalizedErr)
                            })
                    }

                    isCsrfTokenRefreshing = true

                    try {
                        await csrfApi.csrf()

                        csrfTokenProcessQueue(null)

                        return api(originalRequest)
                    } catch (csrfError) {
                        const normalizedRefreshError = errorNormalizer(csrfError)
                        csrfTokenProcessQueue(normalizedRefreshError)

                        window.location.href = "/400"

                        //throw normalizedRefreshError
                        return Promise.reject(normalizedRefreshError)
                    } finally {
                        isCsrfTokenRefreshing = false
                    }
                }
                break

            case API_ERROR_CODES.ACCESS_TOKEN_EXPIRED:

                if (!originalRequest._retry) {
                    originalRequest._retry = true

                    if (isAccessTokenRefreshing) {
                        return new Promise((resolve, reject) => {
                            accessTokenFailedQueue.push({ resolve, reject })
                        })
                            .then(() => api(originalRequest))
                            .catch((err) => {
                                const normalizedErr = errorNormalizer(err)
                                Promise.reject(normalizedErr)
                            })
                    }

                    isAccessTokenRefreshing = true

                    try {
                        await authApi.refresh()

                        accessTokenProcessQueue(null)

                        return api(originalRequest)
                    } catch (refreshError) {
                        const normalizedRefreshError = errorNormalizer(refreshError)
                        accessTokenProcessQueue(normalizedRefreshError)

                        logout()

                        //throw normalizedRefreshError
                        return Promise.reject(normalizedRefreshError)
                    } finally {
                        isAccessTokenRefreshing = false
                    }
                }
                break

            case API_ERROR_CODES.ACCESS_TOKEN_INVALID:
                logout()
                break

            case API_ERROR_CODES.REFRESH_TOKEN_INVALID:
                logout()
                break

        }

        //throw apiError
        return Promise.reject(apiError)
    }
)