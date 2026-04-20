import { useState, useCallback, useEffect, useRef } from 'react'

type FilterValue = string | number | undefined

type Filters<T> = Partial<T>

interface UseFiltersOptions<T> {
  initialFilters?: Filters<T>
  debounceMs?: number
}

interface UseFiltersReturn<T> {
  filters: Filters<T>
  setFilter: <K extends keyof T>(key: K, value: T[K] | undefined) => void
  resetFilters: () => void
  setFilters: (filters: Filters<T>) => void
}

export function useFilters<T extends Record<string, FilterValue>>(
  options: UseFiltersOptions<T> = {}
): UseFiltersReturn<T> {
  const { initialFilters = {} as Filters<T>, debounceMs = 0 } = options
  
  const [filters, setFiltersState] = useState<Filters<T>>(initialFilters)
  
  // Debounce support
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pendingFiltersRef = useRef<Filters<T>>(filters)

  const setFilter = useCallback(<K extends keyof T>(
    key: K,
    value: T[K] | undefined
  ) => {
    const newFilters = { ...filters, [key]: value }
    // Remove undefined values
    if (value === undefined) {
      delete (newFilters as Record<keyof T, T[keyof T]>)[key]
    }
    
    if (debounceMs > 0) {
      pendingFiltersRef.current = newFilters
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setFiltersState(pendingFiltersRef.current)
      }, debounceMs)
    } else {
      setFiltersState(newFilters)
    }
  }, [filters, debounceMs])

  const setFilters = useCallback((newFilters: Filters<T>) => {
    // Remove undefined values
    const cleanedFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([, v]) => v !== undefined)
    ) as Filters<T>
    
    if (debounceMs > 0) {
      pendingFiltersRef.current = cleanedFilters
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setFiltersState(pendingFiltersRef.current)
      }, debounceMs)
    } else {
      setFiltersState(cleanedFilters)
    }
  }, [debounceMs])

  const resetFilters = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setFiltersState(initialFilters)
  }, [initialFilters])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    filters,
    setFilter,
    resetFilters,
    setFilters,
  }
}
