import type { FieldValues } from 'react-hook-form'
import { Button } from '@/shadcn/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shadcn/components/ui/card'
import { FormField } from '@/shared/components/form-fields'
import { Loader2 } from 'lucide-react'
import { useCrudUpdate } from '../hooks/useCrudUpdate'
import type { CrudUpdateProps } from '../types'

export function CrudUpdate<TForm extends FieldValues, TId, TResult>({
  entityName,
  id,
  fieldsConfig,
  schema,
  api,
  queryKey,
  onSuccess,
  onCancel,
  submitLabel = 'Сохранить',
  cancelLabel = 'Отмена',
}: CrudUpdateProps<TForm, TId, TResult>) {
  const { form, isLoading, isSubmitting, error, submitError, handleSubmit } = useCrudUpdate<TForm, TId, TResult>({
    id,
    schema,
    api,
    queryKey,
    onSuccess,
  })

  const onSubmit = form.handleSubmit(handleSubmit)

  if (isLoading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="p-3 rounded-md bg-destructive/10 text-destructive">
            Ошибка загрузки: {error.message}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Редактирование: {entityName}</CardTitle>
        <CardDescription>
          Внесите изменения в форму ниже
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          {fieldsConfig.map((config) => (
            <FormField
              key={String(config.name)}
              control={form.control}
              config={config}
            />
          ))}
          
          {submitError && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
              Ошибка: {submitError.message}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              {cancelLabel}
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
