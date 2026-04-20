import { Badge } from '@/shadcn/components/ui/badge'
import type { ViewFieldConfig } from '../types'

interface CrudViewFieldProps<T> {
  config: ViewFieldConfig<T>
  value: unknown
  item: T
}

export function CrudViewField<T>({ config, value, item }: CrudViewFieldProps<T>) {
  switch (config.type) {
    case 'text':
      return <span>{value as string}</span>

    case 'number': {
      const numValue = value as number
      if (numValue === undefined || numValue === null) return <span>-</span>
      return <span>{config.decimals !== undefined ? numValue.toFixed(config.decimals) : numValue}</span>
    }

    case 'date': {
      const dateValue = value as string
      if (!dateValue) return <span>-</span>
      const date = new Date(dateValue)
      return <span>{date.toLocaleDateString('ru-RU')}</span>
    }

    case 'datetime': {
      const datetimeValue = value as string
      if (!datetimeValue) return <span>-</span>
      const datetime = new Date(datetimeValue)
      return <span>{datetime.toLocaleString('ru-RU')}</span>
    }

    case 'boolean': {
      const boolValue = value as boolean
      if (boolValue === undefined || boolValue === null) return <span>-</span>
      return (
        <Badge variant={boolValue ? 'default' : 'outline'}>
          {boolValue ? (config.trueLabel || 'Да') : (config.falseLabel || 'Нет')}
        </Badge>
      )
    }

    case 'badge': {
      const badgeValue = value as string
      if (!badgeValue) return <span>-</span>
      const variant = config.getVariant?.(value) || config.variant || 'default'
      return <Badge variant={variant}>{badgeValue}</Badge>
    }

    case 'custom':
      return <>{config.render(value, item)}</>

    default:
      return <span>{String(value)}</span>
  }
}
