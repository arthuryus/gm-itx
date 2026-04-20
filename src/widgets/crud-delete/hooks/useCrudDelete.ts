import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CrudDeleteApi, CrudDeleteDialogProps } from '../types'

interface UseCrudDeleteOptions<TId> {
  api: CrudDeleteApi<TId>
  queryKey: string
  onSuccess?: () => void
  onClose: () => void
}

interface UseCrudDeleteReturn<TId> {
  isDeleting: boolean
  deleteError: Error | null
  handleDelete: (id: TId) => Promise<void>
}

export function useCrudDelete<TId>(
  options: UseCrudDeleteOptions<TId>
): UseCrudDeleteReturn<TId> {
  const { api, queryKey, onSuccess, onClose } = options
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: api,
    onSuccess: () => {
      // Invalidate list query to refresh the table
      queryClient.invalidateQueries({ queryKey: [queryKey, 'list'] })
      onSuccess?.()
      onClose()
    },
  })

  const handleDelete = useCallback(
    async (id: TId) => {
      await mutation.mutateAsync(id)
    },
    [mutation]
  )

  return {
    isDeleting: mutation.isPending,
    deleteError: mutation.error,
    handleDelete,
  }
}
