import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GROUPS_QUERY_KEYS } from '../../lib/constants.ts'
import { groupsApi } from '../../api/groups-api.ts'
import type { TUpdateGroupRequestWithId } from '../../api/groups-api.types.ts'
import type { TGroup } from '../../model/group.types.ts'

export function useUpdateGroup() {
    const queryClient = useQueryClient()

    return useMutation<TGroup, Error, TUpdateGroupRequestWithId>({
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
