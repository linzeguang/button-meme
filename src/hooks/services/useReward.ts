import { useState } from 'react'

import { useAccount } from 'wagmi'

import { useFetch } from '@/hooks/services/useFetch'

export interface Reward {
  blockTime: string // 区块时间
  thRewards: string // 当前Epoch的全网TH算力总奖励（6位小数）
  tsRewards: string // 当前Epoch的全网TS排名总奖励（6位小数）
  totalTH: string // 当前Epoch的全网TH算力总和（6位小数）
  totalTS: string // 当前Epoch的TS排名前100的总和（6位小数）
}

export const useReward = () => {
  const [pid, setPid] = useState(0)
  const [epoch, setEpoch] = useState(0)

  const { data, ...rest } = useFetch<Reward>({ url: `/rewards/${pid}/${epoch}` })

  return {
    ...rest,
    data: data?.data,
    setPid,
    setEpoch
  }
}

export interface UserReward {
  a: string
  b: string
  th: string // 我的TH算力
  ts: string // 我的TS值
  thReward: string
  thRewardPercent: number
  thRewardAcc: string // th累计奖励
  tsReward: string
  tsRewardPercent: string
  tsRewardAcc: string // ts累计奖励
  tsRankIndex: number // 我的排名
  proof: string[]
  referencesCount: number // 我的直推人数
  totalRefsCount: number // 我的总推广人数
  directRefsInvested: number // 我的直推资金
  totalRefsInvested: number // 我的总推广资金
}

export const useUserReward = () => {
  const { address } = useAccount()
  const [pid, setPid] = useState(0)
  const [epoch, setEpoch] = useState(0)

  const { data, ...rest } = useFetch<UserReward>({ url: address ? `/rewards/${pid}/${epoch}/${address}` : null })

  return {
    ...rest,
    data: data?.data,
    setPid,
    setEpoch
  }
}
