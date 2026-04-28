import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { handlerError } from "@/shared/api/error/handler-error.ts"
import type { TEmployeesListParams, TEmployeesListResponse } from '../../model/employee.types.ts'
import { employeesApi } from '../../api/employees-api.ts'
import { EMPLOYEES_QUERY_KEYS } from '../../lib/constants.ts'

export function useGetEmployees(params: TEmployeesListParams = {}) {
    const navigate = useNavigate()

    /**
     * Получение данных
     */
    const UseQuery = useQuery<TEmployeesListResponse, Error>({
        queryKey: EMPLOYEES_QUERY_KEYS.list(params),
        queryFn: () => employeesApi.getList(params),
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
