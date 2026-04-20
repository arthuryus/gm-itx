import type { ColumnDef, SortingState, PaginationState } from '@tanstack/react-table'
import type { FilterConfig } from '@/shared/components/filters'

export type SortDirection = 'asc' | 'desc'

export interface SortConfig<T> {
  field: keyof T
  direction: SortDirection
}

export interface ListParams<TFilter> {
  page: number
  pageSize: number
  sort?: SortConfig<unknown>
  filters: TFilter
}

export interface ListResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type CrudListApi<T, TFilter> = (params: ListParams<TFilter>) => Promise<ListResponse<T>>

export interface CrudTableProps<T, TFilter> {
  // Core
  entityName: string
  queryKey: string
  api: CrudListApi<T, TFilter>
  columns: ColumnDef<T>[]
  filterConfig: FilterConfig<TFilter>[]
  
  // Display
  pageSize?: number
  pageSizeOptions?: number[]
  
  // Actions
  showCreateButton?: boolean
  onCreateClick?: () => void
  onViewClick?: (id: string | number) => void
  onEditClick?: (id: string | number) => void
  onDeleteClick?: (id: string | number) => void
  
  // Row actions visibility (can be controlled by permissions)
  showViewAction?: boolean
  showEditAction?: boolean
  showDeleteAction?: boolean
}

export interface UseCrudTableReturn<T, TFilter> {
  // Data
  data: T[]
  total: number
  isLoading: boolean
  error: Error | null
  
  // Pagination
  pagination: PaginationState
  setPagination: (pagination: PaginationState) => void
  
  // Sorting
  sorting: SortingState
  setSorting: (sorting: SortingState) => void
  
  // Refetch
  refetch: () => void
}
