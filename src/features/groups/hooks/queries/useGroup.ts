import { useQuery } from '@tanstack/react-query'
import { groupsApi } from '@/features/groups/api/groups-api.ts'
import { GROUPS_QUERY_KEYS } from '@/features/groups/lib/constants.ts'
import type { Group } from '@/features/groups/model/group.types.ts'

export function useGroup(id: number | null) {
    return useQuery<Group, Error>({
        queryKey: GROUPS_QUERY_KEYS.detail(id ?? 0),
        queryFn: () => groupsApi.getGroup({ id: id! }),
        enabled: id !== null && id !== undefined,
    })
}
