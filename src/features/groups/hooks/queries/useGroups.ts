import { useQuery } from '@tanstack/react-query'
import { groupsApi } from '@/features/groups/api/groups-api.ts'
import { GROUPS_QUERY_KEYS } from '@/features/groups/lib/constants.ts'
import type { GroupsListParams, GroupsListResponse } from '@/features/groups/model/group.types.ts'

export function useGroups(params: GroupsListParams = {}) {
    return useQuery<GroupsListResponse, Error>({
        queryKey: GROUPS_QUERY_KEYS.list(params),
        queryFn: () => groupsApi.getGroups(params),
    })
}
