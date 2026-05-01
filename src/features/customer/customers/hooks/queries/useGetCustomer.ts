import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import type { TCustomer } from '../../model/customer.types.ts'
import { customersApi } from '../../api/customers-api.ts'
import { CUSTOMERS_QUERY_KEYS } from '../../lib/constants.ts'
import { useQuery } from '@tanstack/react-query'
import { handlerError } from "@/shared/api/error/handler-error.ts";

export function useGetCustomer(id: number | null) {
    const navigate = useNavigate()

    /**
     * Получение данных по id
     */
    const UseQuery =  useQuery<TCustomer, Error>({
        queryKey: CUSTOMERS_QUERY_KEYS.detail(id ?? 0),
        queryFn: () => customersApi.getById({ id: id! }),
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
