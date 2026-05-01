import { useMutation } from '@tanstack/react-query'
import { employeesApi } from '../../api/employees-api.ts'
import type { TSendAccessEmployeeRequest, TSendAccessEmployeeResponse } from '../../api/employees-api.types.ts'

export function useSendAccessEmployee() {
    return useMutation<TSendAccessEmployeeResponse, Error, TSendAccessEmployeeRequest>({
        mutationFn: employeesApi.sendAccess,
    })
}