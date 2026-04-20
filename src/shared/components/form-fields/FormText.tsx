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
import type { TextFieldConfig } from './types'
import type { Control } from 'react-hook-form'

interface FormTextProps<TForm extends FieldValues> {
  control: Control<TForm>
  config: TextFieldConfig<TForm>
}

export function FormText<TForm extends FieldValues>({
  control,
  config,
}: FormTextProps<TForm>) {
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
              type="text"
              placeholder={config.placeholder}
              {...field}
              value={field.value || ''}
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
