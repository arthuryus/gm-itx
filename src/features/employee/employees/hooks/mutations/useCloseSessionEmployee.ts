import { useMutation, useQueryClient } from '@tanstack/react-query'
import { employeesApi } from '../../api/employees-api.ts'
import { EMPLOYEES_QUERY_KEYS } from '../../lib/constants.ts'
import type { TCloseSessionEmployeeRequest, TCloseSessionEmployeeResponse } from '../../api/employees-api.types.ts'

export function useCloseSessionEmployee() {
    const queryClient = useQueryClient()

    return useMutation<TCloseSessionEmployeeResponse, Error, TCloseSessionEmployeeRequest>({
        mutationFn: employeesApi.closeSession,
        onSuccess: (_, variables) => {
            //queryClient.invalidateQueries({ queryKey: EMPLOYEES_QUERY_KEYS.all })
            queryClient.invalidateQueries({ queryKey: EMPLOYEES_QUERY_KEYS.detail(variables.id) })
        },
    })
}