import { useMutation } from '@tanstack/react-query'
import { employeesApi } from '../../api/employees-api.ts'
import type { TSendAccessRequest, TSendAccessResponse } from '../../api/employees-api.types.ts'

export function useSendAccessEmployee() {
    return useMutation<TSendAccessResponse, Error, TSendAccessRequest>({
        mutationFn: employeesApi.sendAccess,
    })
}