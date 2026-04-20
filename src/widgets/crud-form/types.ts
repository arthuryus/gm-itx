import type { FieldValues } from 'react-hook-form'
import type { ZodSchema } from 'zod'
import type { FieldConfig } from '@/shared/components/form-fields'

// API types
export type CrudCreateApi<TForm, TResult> = (data: TForm) => Promise<TResult>
export type CrudUpdateApi<TForm, TId, TResult> = (id: TId, data: TForm) => Promise<TResult>
export type CrudGetByIdApi<T, TId> = (id: TId) => Promise<T>

// Create props
export interface CrudCreateProps<TForm extends FieldValues, TResult> {
  entityName: string
  fieldsConfig: FieldConfig<TForm>[]
  schema: ZodSchema<TForm>
  api: CrudCreateApi<TForm, TResult>
  queryKey: string
  onSuccess?: (result: TResult) => void
  onCancel?: () => void
  submitLabel?: string
  cancelLabel?: string
}

// Update props
export interface CrudUpdateProps<TForm extends FieldValues, TId, TResult> {
  entityName: string
  id: TId
  fieldsConfig: FieldConfig<TForm>[]
  schema: ZodSchema<TForm>
  api: {
    getById: CrudGetByIdApi<TForm, TId>
    update: CrudUpdateApi<TForm, TId, TResult>
  }
  queryKey: string
  onSuccess?: (result: TResult) => void
  onCancel?: () => void
  submitLabel?: string
  cancelLabel?: string
}

// Hook return types
export interface UseCrudCreateReturn<TForm extends FieldValues, TResult> {
  form: ReturnType<typeof import('@/widgets/crud-form/hooks/useCrudForm.ts').useCrudForm<TForm>>['form']
  isSubmitting: boolean
  submitError: Error | null
  handleSubmit: (data: TForm) => void
}

export interface UseCrudUpdateReturn<TForm extends FieldValues, TResult> {
  form: ReturnType<typeof import('@/widgets/crud-form/hooks/useCrudForm.ts').useCrudForm<TForm>>['form']
  isLoading: boolean
  isSubmitting: boolean
  error: Error | null
  submitError: Error | null
  handleSubmit: (data: TForm) => void
}
