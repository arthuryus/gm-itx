import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import type { TRolePermissionGroups } from '../../model/role.types.ts'
import { rolesApi } from '../../api/roles-api.ts'
import { ROLES_QUERY_KEYS } from '../../lib/constants.ts'
import { useQuery } from '@tanstack/react-query'
import { handlerError } from "@/shared/api/error/handler-error.ts"

export function useGetRolePermissions() {
    const navigate = useNavigate()

    /**
     * Получение данных по id
     */
    const UseQuery =  useQuery<TRolePermissionGroups, Error>({
        queryKey: ROLES_QUERY_KEYS.permissions(),
        queryFn: () => rolesApi.getPermissions(),
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
