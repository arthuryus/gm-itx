import { Controller, type FieldValues, type Path } from 'react-hook-form'
import {
  Field,
  FieldLabel,
  FieldError,
} from '@/shadcn/components/ui/field'
import {
  InputGroup,
  InputGroupInput,
} from '@/shadcn/components/ui/input-group'
import type { NumberFieldConfig } from './types'
import type { Control } from 'react-hook-form'

interface FormNumberProps<TForm extends FieldValues> {
  control: Control<TForm>
  config: NumberFieldConfig<TForm>
}

export function FormNumber<TForm extends FieldValues>({
  control,
  config,
}: FormNumberProps<TForm>) {
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
          <InputGroup>
            <InputGroupInput
              type="number"
              min={config.min}
              max={config.max}
              placeholder={config.placeholder}
              {...field}
              value={field.value ?? ''}
              onChange={(e) => {
                const value = e.target.value
                field.onChange(value === '' ? undefined : parseInt(value, 10))
              }}
            />
          </InputGroup>
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
