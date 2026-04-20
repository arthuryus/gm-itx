import { Input } from '@/shadcn/components/ui/input'
import type { DateFilterConfig } from './types'

interface FilterDateProps<TFilter> {
  config: DateFilterConfig<TFilter>
  value: string | undefined
  onChange: (value: string | undefined) => void
}

export function FilterDate<TFilter>({
  config,
  value,
  onChange,
}: FilterDateProps<TFilter>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue || undefined)
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-muted-foreground">
        {config.label}
      </label>
      <Input
        type="date"
        placeholder={config.placeholder}
        value={value || ''}
        onChange={handleChange}
        className="w-[180px]"
      />
    </div>
  )
}
