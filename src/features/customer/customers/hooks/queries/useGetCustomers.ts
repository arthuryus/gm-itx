import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { handlerError } from "@/shared/api/error/handler-error.ts"
import type { TCustomersListParams, TCustomersListResponse } from '../../model/customer.types.ts'
import { customersApi } from '../../api/customers-api.ts'
import { CUSTOMERS_QUERY_KEYS } from '../../lib/constants.ts'

export function useGetCustomers(params: TCustomersListParams = {}) {
    const navigate = useNavigate()

    /**
     * Получение данных
     */
    const UseQuery = useQuery<TCustomersListResponse, Error>({
        queryKey: CUSTOMERS_QUERY_KEYS.list(params),
        queryFn: () => customersApi.getList(params),
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
