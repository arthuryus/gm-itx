import { useMutation, useQueryClient } from '@tanstack/react-query'
import { groupsApi } from '@/features/groups/api/groups-api.ts'
import { GROUPS_QUERY_KEYS } from '@/features/groups/lib/constants.ts'
import type { UpdateGroupRequestWithId, Group } from '@/features/groups/api/groups-api.types.ts'
import { toast } from 'sonner'

export function useUpdateGroup() {
    const queryClient = useQueryClient()

    return useMutation<Group, Error, UpdateGroupRequestWithId>({
        mutationFn: ({ id, data }) => groupsApi.updateGroup({ id, data }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: GROUPS_QUERY_KEYS.all })
            queryClient.invalidateQueries({ queryKey: GROUPS_QUERY_KEYS.detail(variables.id) })
            toast.success('Группа обновлена')
        },
        onError: (error) => {
            toast.error('Ошибка при обновлении группы', {
                description: error.message,
            })
        },
    })
}
