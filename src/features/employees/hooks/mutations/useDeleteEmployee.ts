import { useMutation, useQueryClient } from '@tanstack/react-query'
import { employeesApi } from '../../api/employees-api.ts'
import { EMPLOYEES_QUERY_KEYS } from '../../lib/constants.ts'
import type { TDeleteEmployeeRequest } from '../../api/employees-api.types.ts'
import { toast } from 'sonner'

export function useDeleteEmployee() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, TDeleteEmployeeRequest>({
        mutationFn: ({ id }) => employeesApi.delete({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: EMPLOYEES_QUERY_KEYS.all })
            toast.success('Группа удалена')
        },
        onError: () => {//error
            toast.error('Ошибка при удалении группы')
        },
    })
}
