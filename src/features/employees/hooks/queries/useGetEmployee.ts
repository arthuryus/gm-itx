import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import type { TEmployee } from '../../model/employee.types.ts'
import { employeesApi } from '../../api/employees-api.ts'
import { EMPLOYEES_QUERY_KEYS } from '../../lib/constants.ts'
import { useQuery } from '@tanstack/react-query'
import { handlerError } from "@/shared/api/error/handler-error.ts";

export function useGetEmployee(id: number | null) {
    const navigate = useNavigate()

    /**
     * Получение данных по id
     */
    const UseQuery =  useQuery<TEmployee, Error>({
        queryKey: EMPLOYEES_QUERY_KEYS.detail(id ?? 0),
        queryFn: () => employeesApi.getById({ id: id! }),
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
