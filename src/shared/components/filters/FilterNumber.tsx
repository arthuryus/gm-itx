import { Input } from '@/shadcn/components/ui/input'
import type { NumberFilterConfig } from './types'

interface FilterNumberProps<TFilter> {
  config: NumberFilterConfig<TFilter>
  value: number | undefined
  onChange: (value: number | undefined) => void
}

export function FilterNumber<TFilter>({
  config,
  value,
  onChange,
}: FilterNumberProps<TFilter>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue === '') {
      onChange(undefined)
    } else {
      const numValue = parseInt(newValue, 10)
      if (!isNaN(numValue)) {
        onChange(numValue)
      }
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-muted-foreground">
        {config.label}
      </label>
      <Input
        type="number"
        min={config.min}
        max={config.max}
        placeholder={config.placeholder}
        value={value ?? ''}
        onChange={handleChange}
        className="w-[150px]"
      />
    </div>
  )
}
