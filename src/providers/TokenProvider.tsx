import React, {
  createContext,
  useContext
  // useEffect,
  // useMemo
} from 'react'

// import { useAtomValue } from 'jotai/react'
import {
  // useNavigate,
  useParams
} from 'react-router'
import { useAccount } from 'wagmi'

import { TokenInfo, TokenUserInfo } from '@/hooks/contracts/types'
// import { useTokenBaseInfo, useTokenUserInfo } from '@/hooks/contracts/useInfoContract'
import {
  Reward,
  //  useReward,
  UserReward
  //  useUserReward
} from '@/hooks/services/useReward'
// import { ROUTE_PATH } from '@/routes'
// import { projectsAtom } from '@/stores/token'

export interface TokenProviderContextProps {
  tokenId: number
  tokenInfo: TokenInfo | undefined
  tokenUserInfo: TokenUserInfo | undefined
  userReward: UserReward | undefined
  reward: Reward | undefined
}

const TokenProviderContext = createContext<TokenProviderContextProps>({
  tokenId: 0,
  tokenInfo: undefined,
  tokenUserInfo: undefined,
  userReward: undefined,
  reward: undefined
})

const TokenProvider: React.FC<Omit<React.ComponentPropsWithRef<typeof TokenProviderContext.Provider>, 'value'>> = (
  props
) => {
  const { isConnected } = useAccount()
  // const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  // const projects = useAtomValue(projectsAtom)

  // const project = useMemo(() => projects.find((project) => project.id === Number(id)) || projects[0], [id, projects])

  // const tokenInfo = useTokenBaseInfo(project)
  // const tokenUserInfo = useTokenUserInfo(project)
  // const { data: reward } = useReward(project)
  // const { data: userReward } = useUserReward(project)

  // useEffect(() => {
  //   // id 不正确，重定向到第一个token
  //   if (id && project && Number(id) !== project.id) navigate(ROUTE_PATH.TOKEN + `/${project.id}`, { replace: true })
  // }, [id, navigate, project])

  return (
    <TokenProviderContext.Provider
      value={{
        tokenId: Number(id),
        tokenInfo: {
          checkMerkleRoot: false,
          epochReleaseRate: 35,
          mintToken: {
            address: '0xfEC72D0bd1c5b3F245e45c61794183598712874d',
            burnedAmount: 0n,
            decimals: 4,
            name: 'BUTTON',
            symbol: 'BTN'
          },
          miningPool: '0xde63E3Cd48Fd295789A7fd1b960fc1Ffcd802566',
          project: { epoch: 0, id: 0, name: 'BTN' },
          stableToken: {
            address: '0x6B39C617CCCAEe316B3DFb2B0630Fe1F46aDC31C',
            decimals: 4,
            name: 'USDT',
            symbol: 'USDT'
          },
          startBlock: 8587752n,
          thRewardsAcc: 0n,
          totalLPH: 14303n,
          tsRewardsAcc: 0n,
          userRewardsAcc: 0n
        },
        tokenUserInfo: isConnected
          ? {
              claimedRewardsLPH: BigInt((Math.random() * 5_0000).toFixed(0)),
              claimedRewardsTH: BigInt((Math.random() * 6_0000).toFixed(0)),
              claimedRewardsTS: BigInt((Math.random() * 3_0000).toFixed(0)),
              investedAcc: 1000000n,
              lph: 10303n,
              lphRewardPending: BigInt((Math.random() * 2_0000).toFixed(0)),
              referencesCount: BigInt((Math.random() * 8_0000).toFixed(0))
            }
          : undefined,
        reward: {
          blockTime: Date.now().toString(),
          thRewards: (Math.random() * 1_000).toFixed(6),
          tsRewards: (Math.random() * 1_000).toFixed(6),
          totalTH: (Math.random() * 1_000_000).toFixed(6),
          totalTS: (Math.random() * 1_000_000_000).toFixed(6)
        },
        userReward: isConnected
          ? {
              a: 'a',
              b: 'b',
              th: (Math.random() * 1_000_0).toFixed(2), // 我的TH算力
              ts: (Math.random() * 1_000).toFixed(2), // 我的TS值
              thReward: (Math.random() * 1_00).toFixed(6),
              thRewardPercent: Math.random() * 1_000,
              thRewardAcc: (Math.random() * 1_0000).toFixed(6), // th累计奖励
              tsReward: (Math.random() * 1_00).toFixed(6),
              tsRewardPercent: (Math.random() * 1_000).toFixed(6),
              tsRewardAcc: (Math.random() * 1_0000).toFixed(6), // ts累计奖励
              tsRankIndex: 1, // 我的排名
              proof: [],
              referencesCount: Math.floor(Math.random() * 20), // 我的直推人数
              totalRefsCount: Math.floor(Math.random() * 200), // 我的总推广人数
              directRefsInvested: Math.random() * 5000, // 我的直推资金
              totalRefsInvested: Math.random() * 1_0000 // 我的总推广资金
            }
          : undefined
      }}
      {...props}
    />
  )
}

export default TokenProvider

export const useTokenProviderContext = () => useContext(TokenProviderContext)
