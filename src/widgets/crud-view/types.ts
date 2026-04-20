import type { ReactNode } from 'react'

export type CrudGetByIdApi<T, TId> = (id: TId) => Promise<T>

export type ViewFieldType = 'text' | 'number' | 'date' | 'datetime' | 'boolean' | 'badge' | 'custom'

export interface BaseViewFieldConfig<T> {
  name: keyof T
  label: string
  type: ViewFieldType
}

export interface TextViewFieldConfig<T> extends BaseViewFieldConfig<T> {
  type: 'text'
}

export interface NumberViewFieldConfig<T> extends BaseViewFieldConfig<T> {
  type: 'number'
  decimals?: number
}

export interface DateViewFieldConfig<T> extends BaseViewFieldConfig<T> {
  type: 'date'
  format?: string
}

export interface DatetimeViewFieldConfig<T> extends BaseViewFieldConfig<T> {
  type: 'datetime'
  format?: string
}

export interface BooleanViewFieldConfig<T> extends BaseViewFieldConfig<T> {
  type: 'boolean'
  trueLabel?: string
  falseLabel?: string
}

export interface BadgeViewFieldConfig<T> extends BaseViewFieldConfig<T> {
  type: 'badge'
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  getVariant?: (value: unknown) => 'default' | 'secondary' | 'destructive' | 'outline'
}

export interface CustomViewFieldConfig<T> extends BaseViewFieldConfig<T> {
  type: 'custom'
  render: (value: unknown, item: T) => ReactNode
}

export type ViewFieldConfig<T> =
  | TextViewFieldConfig<T>
  | NumberViewFieldConfig<T>
  | DateViewFieldConfig<T>
  | DatetimeViewFieldConfig<T>
  | BooleanViewFieldConfig<T>
  | BadgeViewFieldConfig<T>
  | CustomViewFieldConfig<T>

export interface CrudViewProps<T, TId> {
  entityName: string
  id: TId
  api: {
    getById: CrudGetByIdApi<T, TId>
  }
  fieldsConfig: ViewFieldConfig<T>[]
  queryKey: string
  onEdit?: () => void
  onDelete?: () => void
  onBack?: () => void
  editLabel?: string
  deleteLabel?: string
  backLabel?: string
}
