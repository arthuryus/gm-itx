import { Input } from '@/shadcn/components/ui/input'
import type { TextFilterConfig } from './types'

interface FilterTextProps<TFilter> {
  config: TextFilterConfig<TFilter>
  value: string | undefined
  onChange: (value: string | undefined) => void
}

export function FilterText<TFilter>({
  config,
  value,
  onChange,
}: FilterTextProps<TFilter>) {
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
        type="text"
        placeholder={config.placeholder}
        value={value || ''}
        onChange={handleChange}
        className="w-[200px]"
      />
    </div>
  )
}
