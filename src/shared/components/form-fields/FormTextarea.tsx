import { Controller, type FieldValues, type Path } from 'react-hook-form'
import {
  Field,
  FieldLabel,
  FieldError,
} from '@/shadcn/components/ui/field'
import { Textarea } from '@/shadcn/components/ui/textarea'
import type { TextareaFieldConfig } from './types'
import type { Control } from 'react-hook-form'

interface FormTextareaProps<TForm extends FieldValues> {
  control: Control<TForm>
  config: TextareaFieldConfig<TForm>
}

export function FormTextarea<TForm extends FieldValues>({
  control,
  config,
}: FormTextareaProps<TForm>) {
  return (
    <Controller
      control={control}
      name={config.name as Path<TForm>}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>
            {config.label}
            {config.required && <span className="text-destructive ml-1">*</span>}
          </FieldLabel>
          <Textarea
            placeholder={config.placeholder}
            rows={config.rows || 3}
            {...field}
            value={field.value || ''}
          />
          {config.description && (
            <p className="text-sm text-muted-foreground">{config.description}</p>
          )}
          {fieldState.error && (
            <FieldError>{fieldState.error.message}</FieldError>
          )}
        </Field>
      )}
    />
  )
}
