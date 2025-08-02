import { useFetch } from '@/hooks/services/useFetch'
import { useTokenProviderContext } from '@/providers/TokenProvider'

export interface Rank {
  account: string
  tsRankIndex: number
  ts: string // 6位小数
  tsReward: string // 6位小数
}

export const useRank = () => {
  const { project } = useTokenProviderContext()

  const { data, ...rest } = useFetch<Rank[]>({ url: project ? `/rank/ts/${project.id}/${project.epoch}` : null })

  return {
    ...rest,
    data: data?.data
  }
}
