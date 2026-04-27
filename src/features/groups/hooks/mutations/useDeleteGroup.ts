import { useMutation, useQueryClient } from '@tanstack/react-query'
import { groupsApi } from '@/features/groups/api/groups-api.ts'
import { GROUPS_QUERY_KEYS } from '@/features/groups/lib/constants.ts'
import type { DeleteGroupRequest } from '@/features/groups/api/groups-api.types.ts'
import { toast } from 'sonner'

export function useDeleteGroup() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, DeleteGroupRequest>({
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
