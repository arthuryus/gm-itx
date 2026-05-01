import type { TRolesListParams } from '../model/role.types.ts'

export const ROLES_QUERY_KEYS = {
    all: ['customer_roles'] as const,
    list: (params: TRolesListParams) => ['customer_roles', 'list', params] as const,
    detail: (id: number) => ['customer_roles', 'detail', id] as const,
    permissions: () => ['customer_roles', 'permissions'] as const,
}

export const ROLES_MUTATION_MESSAGES = {
    create: 'Запись создана',
    update: 'Запись обновлена',
    delete: 'Запись удалена',
}