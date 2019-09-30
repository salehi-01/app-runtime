import { Query, QueryOptions } from '../../engine'
import { QueryRenderInput } from '../../types'

import { useCallback } from 'react'
import { useQueryExecutor } from './useQueryExecutor'
import { useStaticInput } from './useStaticInput'
import { useDataEngine } from './useDataEngine'

const empty = {}
export const useDataQuery = (
    query: Query,
    { onComplete, onError, variables = empty }: QueryOptions = {}
): QueryRenderInput => {
    const engine = useDataEngine()
    const [theQuery] = useStaticInput<Query>(query, {
        warn: true,
        name: 'query',
    })
    const execute = useCallback(options => engine.query(theQuery, options), [
        engine,
        theQuery,
    ])
    const { refetch, loading, error, data } = useQueryExecutor({
        execute,
        variables,
        singular: true,
        immediate: true,
        onComplete,
        onError,
    })

    return { engine, refetch, loading, error, data }
}