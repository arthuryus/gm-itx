import { useMutation, useQueryClient } from '@tanstack/react-query'
import { rolesApi } from '../../api/roles-api.ts'
import { ROLES_QUERY_KEYS } from '../../lib/constants.ts'
import type { TDeleteRoleRequest } from '../../api/roles-api.types.ts'
import { toast } from 'sonner'

export function useDeleteRole() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, TDeleteRoleRequest>({
        mutationFn: ({ id }) => rolesApi.delete({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEYS.all })
            toast.success('Группа удалена')
        },
        onError: (error) => {
            toast.error('Ошибка при удалении группы', {
                description: error.message,
            })
        },
    })
}
