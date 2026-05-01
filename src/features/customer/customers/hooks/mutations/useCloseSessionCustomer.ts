import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customersApi } from '../../api/customers-api.ts'
import { CUSTOMERS_QUERY_KEYS } from '../../lib/constants.ts'
import type { TCloseSessionCustomerRequest, TCloseSessionCustomerResponse } from '../../api/customers-api.types.ts'

export function useCloseSessionCustomer() {
    const queryClient = useQueryClient()

    return useMutation<TCloseSessionCustomerResponse, Error, TCloseSessionCustomerRequest>({
        mutationFn: customersApi.closeSession,
        onSuccess: (_, variables) => {
            //queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEYS.all })
            queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEYS.detail(variables.id) })
        },
    })
}