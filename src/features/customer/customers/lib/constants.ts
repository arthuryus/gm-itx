import type { TCustomersListParams } from '../model/customer.types.ts'

export const CUSTOMERS_QUERY_KEYS = {
    all: ['customers'] as const,
    list: (params: TCustomersListParams) => ['customers', 'list', params] as const,
    detail: (id: number) => ['customers', 'detail', id] as const,
}

export const CUSTOMERS_MUTATION_MESSAGES = {
    create: 'Запись создана',
    update: 'Запись обновлена',
    delete: 'Запись удалена',
    closeSession: 'Сессия закрыта',
    sendAccess: 'Доступ отправлен',
}