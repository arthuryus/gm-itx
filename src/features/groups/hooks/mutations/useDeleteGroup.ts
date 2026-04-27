import { useMutation, useQueryClient } from '@tanstack/react-query'
import { groupsApi } from '../../api/groups-api.ts'
import { GROUPS_QUERY_KEYS } from '../../lib/constants.ts'
import type { TDeleteGroupRequest } from '../../api/groups-api.types.ts'
import { toast } from 'sonner'

export function useDeleteGroup() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, TDeleteGroupRequest>({
        mutationFn: ({ id }) => groupsApi.delete({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GROUPS_QUERY_KEYS.all })
            toast.success('Группа удалена')
        },
        onError: (error) => {
            toast.error('Ошибка при удалении группы', {
                description: error.message,
            })
        },
    })
}
