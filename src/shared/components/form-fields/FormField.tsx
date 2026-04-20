import type { FieldValues } from 'react-hook-form'
import { FormText } from './FormText'
import { FormNumber } from './FormNumber'
import { FormSelect } from './FormSelect'
import { FormDate } from './FormDate'
import { FormTextarea } from './FormTextarea'
import { FormCheckbox } from './FormCheckbox'
import type { FieldConfig } from './types'
import type { Control } from 'react-hook-form'

interface FormFieldProps<TForm extends FieldValues> {
  control: Control<TForm>
  config: FieldConfig<TForm>
}

export function FormField<TForm extends FieldValues>({
  control,
  config,
}: FormFieldProps<TForm>) {
  switch (config.type) {
    case 'text':
      return <FormText control={control} config={config} />
    case 'number':
      return <FormNumber control={control} config={config} />
    case 'select':
      return <FormSelect control={control} config={config} />
    case 'date':
      return <FormDate control={control} config={config} />
    case 'textarea':
      return <FormTextarea control={control} config={config} />
    case 'checkbox':
      return <FormCheckbox control={control} config={config} />
    default:
      // @ts-expect-error - exhaustive check
      throw new Error(`Unknown field type: ${config.type}`)
  }
}
