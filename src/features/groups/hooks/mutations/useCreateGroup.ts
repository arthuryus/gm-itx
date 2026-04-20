import { useMutation, useQueryClient } from '@tanstack/react-query'
import { groupsApi } from '@/features/groups/api/groups-api.ts'
import { GROUPS_QUERY_KEYS } from '@/features/groups/lib/constants.ts'
import type { CreateGroupPayload, Group } from '@/features/groups/model/group.types.ts'
import { toast } from 'sonner'

export function useCreateGroup() {
    const queryClient = useQueryClient()

    return useMutation<Group, Error, CreateGroupPayload>({
        mutationFn: (payload) => groupsApi.createGroup(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GROUPS_QUERY_KEYS.all })
            toast.success('Группа создана')
        },
        onError: (error) => {
            toast.error('Ошибка при создании группы', {
                description: error.message,
            })
        },
    })
}
