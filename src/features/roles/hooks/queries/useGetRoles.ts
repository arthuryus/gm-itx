import { useQuery } from '@tanstack/react-query'
import { rolesApi } from '@/features/roles/api/roles-api.ts'
//import { GROUPS_QUERY_KEYS } from '@/features/groups/lib/constants.ts'
//import type { GroupsListParams, GroupsListResponse } from '@/features/groups/model/group.types.ts'

export function useGetRoles(params: GroupsListParams = {}) {
    return useQuery<GroupsListResponse, Error>({
        queryKey: ['roles', 'list', params],//GROUPS_QUERY_KEYS.list(params),
        queryFn: () => rolesApi.getList(params),
    })
}
