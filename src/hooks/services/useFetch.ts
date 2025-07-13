import { useEffect } from 'react'

import useSWR from 'swr'

import { Result } from '@/hooks/services/types'
import fetcher, { METHOD } from '@/lib/fetcher'

export const useFetch = <T, D = any>(parmas: {
  url: string | null
  method?: METHOD
  data?: D
  config?: RequestInit
  options?: Parameters<typeof useSWR<Result<T>>>[2]
}) => {
  const { url, method, data, config, options } = parmas

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const resp = useSWR<Result<T>>(
    {
      url,
      method,
      data,
      config: { ...config }
    },
    fetcher,
    {
      errorRetryCount: 5,
      dedupingInterval: 5000,
      ...options
    }
  )

  useEffect(() => {
    if (resp.data && resp.data.code !== 0) {
      // 错误提示
    }
  }, [resp.data])

  return resp
}
