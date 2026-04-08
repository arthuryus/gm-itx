import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { handlerError } from "@/shared/api/error/handler-error.ts"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // важно: не ретраим автоматически

            //refetchOnWindowFocus: false, // 🔥 глобально
            //refetchOnReconnect: false,
            //staleTime: Infinity
            //staleTime: 5 * 60 * 1000, // 🔥 5 минут
            //staleTime: 0,          // 🔥 сразу устаревший
            //cacheTime: 0,          // 🔥 не хранить в кеше (v4)
            //gcTime: 0,             // 🔥 для v5 (замена cacheTime)
            //refetchOnMount: false,//true,  // 🔥 всегда дергать при маунте

            //onError: (error) => {
            //    handlerError(error)
            //},
        },
        mutations: {
            onError: (error) => {
                console.log('QueryProvider mutations handlerError: ', error)
                handlerError(error)
            },
        },
    },
})

export function QueryProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}