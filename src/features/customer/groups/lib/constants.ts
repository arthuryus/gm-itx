import type { TGroupsListParams } from '../model/group.types.ts'

export const GROUPS_QUERY_KEYS = {
    all: ['customer_groups'] as const,
    list: (params: TGroupsListParams) => ['customer_groups', 'list', params] as const,
    detail: (id: number) => ['customer_groups', 'detail', id] as const,
}

export const GROUPS_MUTATION_MESSAGES = {
    create: 'Запись создана',
    update: 'Запись обновлена',
    delete: 'Запись удалена',
}