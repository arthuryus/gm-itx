import type { FieldValues } from 'react-hook-form'
import { Button } from '@/shadcn/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shadcn/components/ui/card'
import { FormField } from '@/shared/components/form-fields'
import { Loader2 } from 'lucide-react'
import { useCrudCreate } from '../hooks/useCrudCreate'
import type { CrudCreateProps } from '../types'

export function CrudCreate<TForm extends FieldValues, TResult>({
  entityName,
  fieldsConfig,
  schema,
  api,
  queryKey,
  onSuccess,
  onCancel,
  submitLabel = 'Создать',
  cancelLabel = 'Отмена',
}: CrudCreateProps<TForm, TResult>) {
  const { form, isSubmitting, submitError, handleSubmit } = useCrudCreate<TForm, TResult>({
    schema,
    api,
    queryKey,
    onSuccess,
  })

  const onSubmit = form.handleSubmit(handleSubmit)

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Создание: {entityName}</CardTitle>
        <CardDescription>
          Заполните форму ниже для создания новой записи
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
