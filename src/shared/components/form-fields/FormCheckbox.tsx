import { Controller, type FieldValues, type Path } from 'react-hook-form'
import {
  Field,
  FieldLabel,
  FieldError,
} from '@/shadcn/components/ui/field'
import { Checkbox } from '@/shadcn/components/ui/checkbox'
import type { CheckboxFieldConfig } from './types'
import type { Control } from 'react-hook-form'

interface FormCheckboxProps<TForm extends FieldValues> {
  control: Control<TForm>
  config: CheckboxFieldConfig<TForm>
}

export function FormCheckbox<TForm extends FieldValues>({
  control,
  config,
}: FormCheckboxProps<TForm>) {
  return (
    <Controller
      control={control}
      name={config.name as Path<TForm>}
      render={({ field, fieldState }) => (
        <Field className="flex flex-row items-start space-x-3 space-y-0">
          <Checkbox
            checked={field.value || false}
            onCheckedChange={field.onChange}
          />
          <div className="space-y-1 leading-none">
            <FieldLabel className="font-normal">
              {config.label}
              {config.required && <span className="text-destructive ml-1">*</span>}
            </FieldLabel>
            {config.description && (
              <p className="text-sm text-muted-foreground">{config.description}</p>
            )}
          </div>
          {fieldState.error && (
            <FieldError>{fieldState.error.message}</FieldError>
          )}
        </Field>
      )}
    />
  )
}
