import { useMutation } from '@tanstack/react-query'
import { customersApi } from '../../api/customers-api.ts'
import type { TSendAccessCustomerRequest, TSendAccessCustomerResponse } from '../../api/customers-api.types.ts'

export function useSendAccessCustomer() {
    return useMutation<TSendAccessCustomerResponse, Error, TSendAccessCustomerRequest>({
        mutationFn: customersApi.sendAccess,
    })
}