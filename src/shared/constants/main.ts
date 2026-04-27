//export type TStatus = 'ACTIVE' | 'INACTIVE'
export type TStatus = (typeof STATUS)[keyof typeof STATUS]
export const STATUS = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
} as const
export const STATUS_LABEL = {
    ACTIVE: 'Активный',
    INACTIVE: 'Неактивный',
} as const
export const STATUS_SELECT = [
    {value: STATUS.ACTIVE, label: STATUS_LABEL.ACTIVE},
    {value: STATUS.INACTIVE, label: STATUS_LABEL.INACTIVE}
] as const


export const DEFAULT_PER_PAGE = 10
export const PER_PAGE_OPTIONS = [1, 10, 20, 25, 50, 100]