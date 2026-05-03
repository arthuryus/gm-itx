import { useEffect, useMemo } from 'react'
import { useNavigate } from "react-router-dom"
import type { TGroupsListParams, TGroupsListResponse } from '../../model/group.types.ts'
import { groupsApi } from '../../api/groups-api.ts'
import { GROUPS_QUERY_KEYS } from '../../lib/constants.ts'
import { useQuery } from '@tanstack/react-query'
import { handlerError } from "@/shared/api/error/handler-error.ts"

export function useGetGroups(params: TGroupsListParams = {}) {
    const navigate = useNavigate()

    /**
     * Получение данных
     */
    const UseQuery = useQuery<TGroupsListResponse, Error>({
        queryKey: GROUPS_QUERY_KEYS.list(params),
        queryFn: () => groupsApi.getList(params),
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


export function useGetGroupsList(params: TGroupsListParams = {}) {
    const defaultParams = {
        page: 1,
        perPage: 100,
        sort: [],
        filter: undefined,
    }

    /**
     * Получение списка групп
     */
    const query = useGetGroups({
        ...defaultParams,
        ...params,
    })

    /**
     * Обработка списка групп
     */
    const options = useMemo(() => {
        if (!query.data) return []

        return query.data.items.map((group) => ({
            value: String(group.id),
            label: group.name,
        }))
    }, [query.data])

    return {
        ...query,
        options,
    }
}
