import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GROUPS_QUERY_KEYS } from '@/features/groups/lib/constants.ts'
import { groupsApi } from '@/features/groups/api/groups-api.ts'
import type { UpdateGroupRequestWithId } from '@/features/groups/api/groups-api.types.ts'
import type { TGroup } from '@/features/groups/model/group.types.ts'

export function useUpdateGroup() {
    const queryClient = useQueryClient()

    return useMutation<TGroup, Error, UpdateGroupRequestWithId>({
        mutationFn: ({ id, data }) => groupsApi.update({ id, data }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: GROUPS_QUERY_KEYS.all })
            queryClient.invalidateQueries({ queryKey: GROUPS_QUERY_KEYS.detail(variables.id) })
            //toast.success('Группа обновлена')
        },
        onError: () => {//error
            //toast.error('Ошибка при обновлении группы')
        },
    })
}
