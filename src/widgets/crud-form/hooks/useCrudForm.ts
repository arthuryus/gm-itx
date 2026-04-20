import { useForm, type UseFormReturn, type FieldValues, type DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ZodSchema } from 'zod'
import { useCallback } from 'react'

interface UseCrudFormOptions<TForm extends FieldValues> {
  schema: ZodSchema<TForm>
  defaultValues?: DefaultValues<TForm>
}

interface UseCrudFormReturn<TForm extends FieldValues> {
  form: UseFormReturn<TForm>
  resetForm: () => void
  setFormValue: <K extends keyof TForm>(name: K, value: TForm[K]) => void
  getFormValues: () => TForm
}

export function useCrudForm<TForm extends FieldValues>(
  options: UseCrudFormOptions<TForm>
): UseCrudFormReturn<TForm> {
  const { schema, defaultValues } = options

  const form = useForm<TForm>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
  })

  const resetForm = useCallback(() => {
    form.reset(defaultValues)
  }, [form, defaultValues])

  const setFormValue = useCallback(<K extends keyof TForm>(
    name: K,
    value: TForm[K]
  ) => {
    form.setValue(name as string, value)
  }, [form])

  const getFormValues = useCallback(() => {
    return form.getValues()
  }, [form])

  return {
    form,
    resetForm,
    setFormValue,
    getFormValues,
  }
}
