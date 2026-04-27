import type { TGroupsListParams } from '../model/group.types.ts'

export const GROUPS_QUERY_KEYS = {
    all: ['groups'] as const,
    list: (params: TGroupsListParams) => ['groups', 'list', params] as const,
    detail: (id: number) => ['groups', 'detail', id] as const,
}