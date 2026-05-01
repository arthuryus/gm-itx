import { useMutation, useQueryClient } from '@tanstack/react-query'
import { employeesApi } from '../../api/employees-api.ts'
import { EMPLOYEES_QUERY_KEYS } from '../../lib/constants.ts'
import type { TCreateEmployeeRequestWithoutId } from '../../api/employees-api.types.ts'
import type { TEmployee } from '../../model/employee.types.ts'

export function useCreateEmployee() {
    const queryClient = useQueryClient()

    return useMutation<TEmployee, Error, TCreateEmployeeRequestWithoutId>({
        mutationFn: (data) => employeesApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: EMPLOYEES_QUERY_KEYS.all })
            //toast.success('Группа создана')
        },
        onError: () => {//error
            //toast.error('Ошибка при создании группы')
        },
    })
}
