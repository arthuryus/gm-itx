import { useMutation, useQueryClient } from '@tanstack/react-query'
import { rolesApi } from '../../api/roles-api.ts'
import { ROLES_QUERY_KEYS } from '../../lib/constants.ts'
import type { TCreateRoleRequestWithoutId } from '../../api/roles-api.types.ts'
import type { TRole } from '../../model/role.types.ts'

export function useCreateRole() {
    const queryClient = useQueryClient()

    return useMutation<TRole, Error, TCreateRoleRequestWithoutId>({
        mutationFn: (data) => rolesApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEYS.all })
            //toast.success('Группа создана')
        },
        onError: () => {//error
            //toast.error('Ошибка при создании группы')
        },
    })
}
