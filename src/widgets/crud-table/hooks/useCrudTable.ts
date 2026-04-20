import { useState, useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { SortingState, PaginationState } from '@tanstack/react-table'
import type {
  CrudListApi,
  ListParams,
  SortConfig,
  UseCrudTableReturn,
} from '../types'

interface UseCrudTableOptions<T, TFilter> {
  api: CrudListApi<T, TFilter>
  queryKey: string
  filters: TFilter
  pageSize?: number
}

export function useCrudTable<T, TFilter>(
  options: UseCrudTableOptions<T, TFilter>
): UseCrudTableReturn<T, TFilter> {
  const { api, queryKey, filters, pageSize = 10 } = options

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })

  const [sorting, setSorting] = useState<SortingState>([])

  // Convert tanstack sorting to our SortConfig
  const sortConfig: SortConfig<unknown> | undefined = useMemo(() => {
    if (sorting.length === 0) return undefined
    return {
      field: sorting[0].id as keyof unknown,
      direction: sorting[0].desc ? 'desc' : 'asc',
    }
  }, [sorting])

  // Build query params
  const listParams: ListParams<TFilter> = useMemo(
    () => ({
      page: pagination.pageIndex + 1, // API uses 1-based indexing
      pageSize: pagination.pageSize,
      sort: sortConfig,
      filters,
    }),
    [pagination, sortConfig, filters]
  )

  // Fetch data
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [queryKey, 'list', listParams],
    queryFn: () => api(listParams),
    placeholderData: (previousData) => previousData,
  })

  // Extract values with defaults
  const items = data?.data ?? []
  const total = data?.total ?? 0
  //const tableData = useMemo(() => data?.items ?? [], [data])
  //const totalPages = data?.meta?.totalPages ?? 0
  //const totalItems = data?.meta?.totalItems ?? 0

  // Manual refetch wrapper
  const handleRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  return {
    data: items,
    total,
    isLoading,
    error,
    pagination,
    setPagination,
    sorting,
    setSorting,
    refetch: handleRefetch,
  }
}
