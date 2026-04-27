import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import type { TGroup } from '@/features/groups/model/group.types.ts'
import { groupsApi } from '@/features/groups/api/groups-api.ts'
import { GROUPS_QUERY_KEYS } from '@/features/groups/lib/constants.ts'
import { useQuery } from '@tanstack/react-query'
import { handlerError } from "@/shared/api/error/handler-error.ts";

export function useGetGroup(id: number | null) {
    const navigate = useNavigate()

    /**
     * Получение данных по id
     */
    const UseQuery =  useQuery<TGroup, Error>({
        queryKey: GROUPS_QUERY_KEYS.detail(id ?? 0),
        queryFn: () => groupsApi.getById({ id: id! }),
        enabled: id !== null && id !== undefined,
    })

    const { error } = UseQuery

    /**
     * Обработка ошибок при загрузке данных
     */
    useEffect(() => {
        if (error) {
            handlerError(error, {navigate})
        }
    }, [error, navigate])

    return UseQuery
}
