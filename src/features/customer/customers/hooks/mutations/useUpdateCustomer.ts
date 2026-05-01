import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CUSTOMERS_QUERY_KEYS } from '../../lib/constants.ts'
import { customersApi } from '../../api/customers-api.ts'
import type { TUpdateCustomerRequestWithId } from '../../api/customers-api.types.ts'
import type { TCustomer } from '../../model/customer.types.ts'

export function useUpdateCustomer() {
    const queryClient = useQueryClient()

    return useMutation<TCustomer, Error, TUpdateCustomerRequestWithId>({
        mutationFn: ({ id, data }) => customersApi.update({ id, data }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEYS.all })
            queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEYS.detail(variables.id) })
            //toast.success('Группа обновлена')
        },
        onError: () => {//error
            //toast.error('Ошибка при обновлении группы')
        },
    })
}
