import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EMPLOYEES_QUERY_KEYS } from '../../lib/constants.ts'
import { employeesApi } from '../../api/employees-api.ts'
import type { TUpdateEmployeeRequestWithId } from '../../api/employees-api.types.ts'
import type { TEmployee } from '../../model/employee.types.ts'

export function useUpdateEmployee() {
    const queryClient = useQueryClient()

    return useMutation<TEmployee, Error, TUpdateEmployeeRequestWithId>({
        mutationFn: ({ id, data }) => employeesApi.update({ id, data }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: EMPLOYEES_QUERY_KEYS.all })
            queryClient.invalidateQueries({ queryKey: EMPLOYEES_QUERY_KEYS.detail(variables.id) })
            //toast.success('Группа обновлена')
        },
        onError: () => {//error
            //toast.error('Ошибка при обновлении группы')
        },
    })
}
