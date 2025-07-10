import { useFetch } from '@/hooks/services/useFetch'

export interface Price {
  date: string
  price: string
}

export const usePrice = () => {
  const { data, ...rest } = useFetch<Price[]>({ url: '/price/0' })

  return {
    ...rest,
    data: data?.data
  }
}
