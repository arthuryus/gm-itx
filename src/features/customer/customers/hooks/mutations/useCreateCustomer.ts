import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customersApi } from '../../api/customers-api.ts'
import { CUSTOMERS_QUERY_KEYS } from '../../lib/constants.ts'
import type { TCreateCustomerRequestWithoutId } from '../../api/customers-api.types.ts'
import type { TCustomer } from '../../model/customer.types.ts'

export function useCreateCustomer() {
    const queryClient = useQueryClient()

    return useMutation<TCustomer, Error, TCreateCustomerRequestWithoutId>({
        mutationFn: (data) => customersApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEYS.all })
            //toast.success('Группа создана')
        },
        onError: () => {//error
            //toast.error('Ошибка при создании группы')
        },
    })
}
