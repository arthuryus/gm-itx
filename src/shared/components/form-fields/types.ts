import type { ReactNode } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'

export type FieldType = 'text' | 'number' | 'select' | 'date' | 'textarea' | 'checkbox'

export interface BaseFieldConfig<TForm extends FieldValues> {
  name: Path<TForm>
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  description?: string
}

export interface TextFieldConfig<TForm extends FieldValues> extends BaseFieldConfig<TForm> {
  type: 'text'
}

export interface NumberFieldConfig<TForm extends FieldValues> extends BaseFieldConfig<TForm> {
  type: 'number'
  min?: number
  max?: number
}

export interface SelectFieldConfig<TForm extends FieldValues> extends BaseFieldConfig<TForm> {
  type: 'select'
  options: { value: string; label: string }[]
}

export interface DateFieldConfig<TForm extends FieldValues> extends BaseFieldConfig<TForm> {
  type: 'date'
}

export interface TextareaFieldConfig<TForm extends FieldValues> extends BaseFieldConfig<TForm> {
  type: 'textarea'
  rows?: number
}

export interface CheckboxFieldConfig<TForm extends FieldValues> extends BaseFieldConfig<TForm> {
  type: 'checkbox'
}

export type FieldConfig<TForm extends FieldValues> =
  | TextFieldConfig<TForm>
  | NumberFieldConfig<TForm>
  | SelectFieldConfig<TForm>
  | DateFieldConfig<TForm>
  | TextareaFieldConfig<TForm>
  | CheckboxFieldConfig<TForm>

// Props for individual field components
export interface FormFieldProps<TForm extends FieldValues> {
  control: Control<TForm>
  config: FieldConfig<TForm>
}
