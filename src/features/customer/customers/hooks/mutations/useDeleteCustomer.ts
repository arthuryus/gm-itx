import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customersApi } from '../../api/customers-api.ts'
import { CUSTOMERS_QUERY_KEYS, CUSTOMERS_MUTATION_MESSAGES } from '../../lib/constants.ts'
import type { TDeleteCustomerRequest } from '../../api/customers-api.types.ts'
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { toast } from 'sonner'

export function useDeleteCustomer() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    return useMutation<void, Error, TDeleteCustomerRequest>({
        mutationFn: ({ id }) => customersApi.delete({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEYS.all })
            toast.success(CUSTOMERS_MUTATION_MESSAGES.delete)
        },
        onError: (error) => {
            //toast.error('Ошибка при удалении группы')
            handlerError(error, { navigate })
        },
    })
}
