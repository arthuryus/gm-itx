export type FilterType = 'text' | 'number' | 'select' | 'date'

export interface BaseFilterConfig<TFilter> {
  name: keyof TFilter
  label: string
  placeholder?: string
}

export interface TextFilterConfig<TFilter> extends BaseFilterConfig<TFilter> {
  type: 'text'
}

export interface NumberFilterConfig<TFilter> extends BaseFilterConfig<TFilter> {
  type: 'number'
  min?: number
  max?: number
}

export interface SelectFilterConfig<TFilter, K extends string = string> extends BaseFilterConfig<TFilter> {
  type: 'select'
  options: { value: K; label: string }[]
}

export interface DateFilterConfig<TFilter> extends BaseFilterConfig<TFilter> {
  type: 'date'
}

export type FilterConfig<TFilter> =
  | TextFilterConfig<TFilter>
  | NumberFilterConfig<TFilter>
  | SelectFilterConfig<TFilter>
  | DateFilterConfig<TFilter>

// Value types for each filter type
export type FilterValue<T> = T extends 'text' ? string
  : T extends 'number' ? number
  : T extends 'select' ? string
  : T extends 'date' ? string
  : never
