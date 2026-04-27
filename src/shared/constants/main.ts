//export type TStatus = 'ACTIVE' | 'INACTIVE'
export type TStatus = (typeof Main)[keyof typeof Main]
export const Main = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
} as const
export const STATUS_LABEL = {
    ACTIVE: 'Активный',
    INACTIVE: 'Неактивный',
} as const
export const STATUS_SELECT = [
    {value: Main.ACTIVE, label: STATUS_LABEL.ACTIVE},
    {value: Main.INACTIVE, label: STATUS_LABEL.INACTIVE}
] as const


export const DEFAULT_PER_PAGE = 10
export const PER_PAGE_OPTIONS = [1, 10, 20, 25, 50, 100]