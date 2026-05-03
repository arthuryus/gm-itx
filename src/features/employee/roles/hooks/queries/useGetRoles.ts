import { useEffect, useMemo } from 'react'
import { useNavigate } from "react-router-dom"
import type { TRolesListParams, TRolesListResponse } from '../../model/role.types.ts'
import { rolesApi } from '../../api/roles-api.ts'
import { ROLES_QUERY_KEYS } from '../../lib/constants.ts'
import { useQuery } from '@tanstack/react-query'
import { handlerError } from "@/shared/api/error/handler-error.ts"

export function useGetRoles(params: TRolesListParams = {}) {
    const navigate = useNavigate()

    /**
     * Получение данных
     */
    const UseQuery = useQuery<TRolesListResponse, Error>({
        queryKey: ROLES_QUERY_KEYS.list(params),
        queryFn: () => rolesApi.getList(params),
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

export function useGetRolesList(params: TRolesListParams = {}) {
    const defaultParams = {
        page: 1,
        perPage: 100,
        sort: [],
        filter: undefined,
    }

    /**
     * Получение списка ролей
     */
    const query = useGetRoles({
        ...defaultParams,
        ...params,
    })

    /**
     * Обработка списка ролей
     */
    const options = useMemo(() => {
        if (!query.data) return []

        return query.data.items.map((role) => ({
            value: String(role.id),
            label: role.title,
        }))
    }, [query.data])

    return {
        ...query,
        options,
    }
}