import type { GroupsListParams } from '@/features/groups/model/group.types.ts'

export const GROUPS_QUERY_KEYS = {
    all: ['groups'] as const,
    list: (params: GroupsListParams) => ['groups', 'list', params] as const,
    detail: (id: number) => ['groups', 'detail', id] as const,
}

export const DEFAULT_PER_PAGE = 10
export const PER_PAGE_OPTIONS = [1, 10, 20, 25, 50, 100]
