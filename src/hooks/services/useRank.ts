import { useState } from 'react'

import { useFetch } from '@/hooks/services/useFetch'

export interface Rank {
  account: string
  tsRankIndex: number
  ts: string // 6位小数
  tsReward: string // 6位小数
}

export const useRank = () => {
  const [pid, setPid] = useState(0)
  const [epoch, setEpoch] = useState(0)

  const { data, ...rest } = useFetch<Rank[]>({ url: `/rank/ts/${pid}/${epoch}` })

  return {
    ...rest,
    data: data?.data,
    setPid,
    setEpoch
  }
}
