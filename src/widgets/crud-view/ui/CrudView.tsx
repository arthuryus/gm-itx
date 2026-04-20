import { useQuery } from '@tanstack/react-query'
import { Button } from '@/shadcn/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card'
import { Separator } from '@/shadcn/components/ui/separator'
import { ArrowLeft, Pencil, Trash2, Loader2 } from 'lucide-react'
import { CrudViewField } from './CrudViewField'
import type { CrudViewProps } from '../types'

export function CrudView<T, TId>({
  entityName,
  id,
  api,
  fieldsConfig,
  queryKey,
  onEdit,
  onDelete,
  onBack,
  editLabel = 'Редактировать',
  deleteLabel = 'Удалить',
  backLabel = 'Назад',
}: CrudViewProps<T, TId>) {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey, 'detail', id],
    queryFn: () => api.getById(id),
    enabled: id !== undefined && id !== null,
  })

  if (isLoading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="p-3 rounded-md bg-destructive/10 text-destructive">
            Ошибка загрузки: {error.message}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Данные не найдены
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{entityName}</CardTitle>
            <CardDescription>
              Просмотр деталей записи
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Pencil className="h-4 w-4 mr-1" />
                {editLabel}
              </Button>
            )}
            {onDelete && (
              <Button variant="destructive" size="sm" onClick={onDelete}>
                <Trash2 className="h-4 w-4 mr-1" />
                {deleteLabel}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {fieldsConfig.map((config, index) => (
          <div key={String(config.name)}>
            <div className="grid grid-cols-3 gap-4 items-start">
              <dt className="text-sm font-medium text-muted-foreground">
                {config.label}
              </dt>
              <dd className="col-span-2 text-sm">
                <CrudViewField
                  config={config}
                  value={data[config.name]}
                  item={data}
                />
              </dd>
            </div>
            {index < fieldsConfig.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </CardContent>

      {onBack && (
        <CardFooter>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            {backLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
