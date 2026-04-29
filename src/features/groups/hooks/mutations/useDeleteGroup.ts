import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { groupsApi } from '../../api/groups-api.ts'
import { GROUPS_QUERY_KEYS, GROUPS_MUTATION_MESSAGES } from '../../lib/constants.ts'
import type { TDeleteGroupRequest } from '../../api/groups-api.types.ts'
import { handlerError } from "@/shared/api/error/handler-error.ts"
import { toast } from 'sonner'

export function useDeleteGroup() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    return useMutation<void, Error, TDeleteGroupRequest>({
        mutationFn: ({ id }) => groupsApi.delete({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GROUPS_QUERY_KEYS.all })
            toast.success(GROUPS_MUTATION_MESSAGES.delete)
        },
        onError: (error) => {
            //toast.error('Ошибка при удалении группы')
            handlerError(error, { navigate })
        },
    })
}
