import { useEffect } from 'react'
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