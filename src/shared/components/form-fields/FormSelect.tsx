import { Controller, type FieldValues, type Path } from 'react-hook-form'
import {
  Field,
  FieldLabel,
  FieldError,
} from '@/shadcn/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/ui/select'
import type { SelectFieldConfig } from './types'
import type { Control } from 'react-hook-form'

interface FormSelectProps<TForm extends FieldValues> {
  control: Control<TForm>
  config: SelectFieldConfig<TForm>
}

export function FormSelect<TForm extends FieldValues>({
  control,
  config,
}: FormSelectProps<TForm>) {
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
          <Select
            value={field.value || ''}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={config.placeholder || 'Выберите...'} />
            </SelectTrigger>
            <SelectContent>
              {config.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
