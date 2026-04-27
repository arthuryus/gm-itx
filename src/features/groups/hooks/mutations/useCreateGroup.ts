import { useMutation, useQueryClient } from '@tanstack/react-query'
import { groupsApi } from '@/features/groups/api/groups-api.ts'
import { GROUPS_QUERY_KEYS } from '@/features/groups/lib/constants.ts'
import type { CreateGroupRequestWithoutId } from '@/features/groups/api/groups-api.types.ts'
import type { TGroup } from '@/features/groups/model/group.types.ts'

export function useCreateGroup() {
    const queryClient = useQueryClient()

    return useMutation<TGroup, Error, CreateGroupRequestWithoutId>({
        mutationFn: (data) => groupsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GROUPS_QUERY_KEYS.all })
            //toast.success('Группа создана')
        },
        onError: () => {//error
            //toast.error('Ошибка при создании группы')
        },
    })
}
