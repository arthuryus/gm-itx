import { useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCrudForm } from '@/widgets/crud-form/hooks/useCrudForm.ts'
import type { FieldValues } from 'react-hook-form'
import type { CrudCreateProps, UseCrudCreateReturn } from '../types'

type UseCrudCreateOptions<TForm extends FieldValues, TResult> = Pick<
  CrudCreateProps<TForm, TResult>,
  'schema' | 'api' | 'queryKey' | 'onSuccess'
>

export function useCrudCreate<TForm extends FieldValues, TResult>(
  options: UseCrudCreateOptions<TForm, TResult>
): UseCrudCreateReturn<TForm, TResult> {
  const { schema, api, queryKey, onSuccess } = options
  const queryClient = useQueryClient()

  const { form, resetForm } = useCrudForm<TForm>({
    schema,
  })

  const mutation = useMutation({
    mutationFn: api,
    onSuccess: (result) => {
      // Invalidate list query to refresh the table
      queryClient.invalidateQueries({ queryKey: [queryKey, 'list'] })
      resetForm()
      onSuccess?.(result)
    },
  })

  const handleSubmit = useCallback(
    async (data: TForm) => {
      await mutation.mutateAsync(data)
    },
    [mutation]
  )

  return {
    form,
    isSubmitting: mutation.isPending,
    submitError: mutation.error,
    handleSubmit,
  }
}
