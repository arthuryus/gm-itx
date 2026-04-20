import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/ui/select'
import type { SelectFilterConfig } from './types'

interface FilterSelectProps<TFilter, K extends string = string> {
  config: SelectFilterConfig<TFilter, K>
  value: K | undefined
  onChange: (value: K | undefined) => void
}

export function FilterSelect<TFilter, K extends string = string>({
  config,
  value,
  onChange,
}: FilterSelectProps<TFilter, K>) {
  const handleChange = (newValue: string) => {
    onChange(newValue as K || undefined)
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-muted-foreground">
        {config.label}
      </label>
      <Select value={value || ''} onValueChange={handleChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={config.placeholder || 'Выберите...'} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все</SelectItem>
          {config.options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
