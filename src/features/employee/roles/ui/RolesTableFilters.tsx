import { useState, useEffect } from 'react'
import type { TRoleFilter } from '../model/role.types.ts'
import { InputGroup, InputGroupInput } from '@/shadcn/components/ui/input-group'
import { Input } from '@/shadcn/components/ui/input'

interface RolesTableFiltersProps {
    filters: TRoleFilter
    onFiltersChange: (filters: TRoleFilter) => void
}

export function RolesTableFilters({ filters, onFiltersChange }: RolesTableFiltersProps) {
    const [localFilters, setLocalFilters] = useState<TRoleFilter>(filters)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onFiltersChange(localFilters)
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [localFilters, onFiltersChange])

    const handleStringChange = (name: keyof TRoleFilter, value: string) => {
        setLocalFilters((prev) => ({ ...prev, [name]: value || undefined }))
    }

    const handleNumberChange = (name: keyof TRoleFilter, value: string) => {
        const numValue = value === '' ? undefined : parseInt(value, 10)
        setLocalFilters((prev) => ({ ...prev, [name]: numValue }))
    }

    return (
        <div className="flex flex-wrap items-end gap-4 p---4">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">ID</label>
                    <Input
                        type="number"
                        min={0}
                        placeholder="Поиск по ID"
                        value={localFilters.id || ''}
                        onChange={(e) => handleNumberChange('id', e.target.value)}
                    />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Название</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по названию..."
                        value={localFilters.title || ''}
                        onChange={(e) => handleStringChange('title', e.target.value)}
                    />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Идентификатор</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по идентификатору..."
                        value={localFilters.code || ''}
                        onChange={(e) => handleStringChange('code', e.target.value)}
                    />
                </InputGroup>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Описание</label>
                <InputGroup className="w-[200px]">
                    <InputGroupInput
                        placeholder="Поиск по описанию..."
                        value={localFilters.description || ''}
                        onChange={(e) => handleStringChange('description', e.target.value)}
                    />
                </InputGroup>
            </div>
        </div>
    )
}
