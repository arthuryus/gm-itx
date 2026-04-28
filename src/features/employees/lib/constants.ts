import type { TEmployeesListParams } from '../model/employee.types.ts'

export const EMPLOYEES_QUERY_KEYS = {
    all: ['employees'] as const,
    list: (params: TEmployeesListParams) => ['employees', 'list', params] as const,
    detail: (id: number) => ['employees', 'detail', id] as const,
}