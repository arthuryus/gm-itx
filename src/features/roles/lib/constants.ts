import type { TRolesListParams } from '../model/role.types.ts'

export const ROLES_QUERY_KEYS = {
    all: ['roles'] as const,
    list: (params: TRolesListParams) => ['roles', 'list', params] as const,
    detail: (id: number) => ['roles', 'detail', id] as const,
    permissions: () => ['roles', 'permissions'] as const,
}