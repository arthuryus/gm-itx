import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import type { TRoleDetail } from '../../model/role.types.ts'//, TRoleFormData
//import type { TRole } from '../../model/role.types.ts'
import { rolesApi } from '../../api/roles-api.ts'
import { ROLES_QUERY_KEYS } from '../../lib/constants.ts'
import { useQuery } from '@tanstack/react-query'
import { handlerError } from "@/shared/api/error/handler-error.ts"

export function useGetRole(
    id: number | null,
) {
    const navigate = useNavigate()

    /**
     * Получение данных по id
     */
    const UseQuery =  useQuery<TRoleDetail, Error>({
        queryKey: ROLES_QUERY_KEYS.detail(id ?? 0),
        queryFn: () => rolesApi.getById({ id: id! }),
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
