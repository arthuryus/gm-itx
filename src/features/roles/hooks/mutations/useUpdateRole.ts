import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ROLES_QUERY_KEYS } from '../../lib/constants.ts'
import { rolesApi } from '../../api/roles-api.ts'
import type { TUpdateRoleRequestWithId } from '../../api/roles-api.types.ts'
import type { TRole } from '../../model/role.types.ts'
//import type { TRoleDetail } from '../../model/role.types.ts'

export function useUpdateRole() {
    const queryClient = useQueryClient()

    return useMutation<TRole, Error, TUpdateRoleRequestWithId>({
        mutationFn: ({ id, data }) => rolesApi.update({ id, data }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEYS.all })
            queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEYS.detail(variables.id) })
            //toast.success('Группа обновлена')
        },
        onError: () => {//error
            //toast.error('Ошибка при обновлении группы')
        },
    })
}
