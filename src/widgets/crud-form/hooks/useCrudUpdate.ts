import { useCallback, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCrudForm } from '@/widgets/crud-form/hooks/useCrudForm.ts'
import type { FieldValues } from 'react-hook-form'
import type { CrudUpdateProps, UseCrudUpdateReturn } from '../types'

type UseCrudUpdateOptions<TForm extends FieldValues, TId, TResult> = Pick<
  CrudUpdateProps<TForm, TId, TResult>,
  'id' | 'schema' | 'api' | 'queryKey' | 'onSuccess'
>

export function useCrudUpdate<TForm extends FieldValues, TId, TResult>(
  options: UseCrudUpdateOptions<TForm, TId, TResult>
): UseCrudUpdateReturn<TForm, TResult> {
  const { id, schema, api, queryKey, onSuccess } = options
  const queryClient = useQueryClient()

  const { form, resetForm, setFormValue } = useCrudForm<TForm>({
    schema,
  })

  // Fetch existing data
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey, 'detail', id],
    queryFn: () => api.getById(id),
    enabled: id !== undefined && id !== null,
  })

  // Populate form when data loads
  useEffect(() => {
    if (data) {
      // Reset form with fetched data
      const formData = data as Record<string, unknown>
      Object.entries(formData).forEach(([key, value]) => {
        setFormValue(key as keyof TForm, value as TForm[keyof TForm])
      })
    }
  }, [data, setFormValue])

  const mutation = useMutation({
    mutationFn: (formData: TForm) => api.update(id, formData),
    onSuccess: (result) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: [queryKey, 'list'] })
      queryClient.invalidateQueries({ queryKey: [queryKey, 'detail', id] })
      onSuccess?.(result)
    },
  })

  const handleSubmit = useCallback(
    async (formData: TForm) => {
      await mutation.mutateAsync(formData)
    },
    [mutation]
  )

  return {
    form,
    isLoading,
    isSubmitting: mutation.isPending,
    error,
    submitError: mutation.error,
    handleSubmit,
  }
}
