import React, { createContext, useContext, useEffect, useMemo } from 'react'

import { useAtomValue } from 'jotai/react'
import { useNavigate, useParams } from 'react-router'
import { useAccount } from 'wagmi'

import { Project, TokenInfo, TokenUserInfo } from '@/hooks/contracts/types'
import { useTokenBaseInfo, useTokenUserInfo } from '@/hooks/contracts/useInfoContract'
import { Reward, useReward, UserReward, useUserReward } from '@/hooks/services/useReward'
import { ROUTE_PATH } from '@/routes'
import { projectsAtom } from '@/stores/token'

export interface TokenProviderContextProps {
  project: Project
  tokenId: number
  tokenInfo: TokenInfo | undefined
  tokenUserInfo: TokenUserInfo | undefined
  userReward: UserReward | undefined
  reward: Reward | undefined
}

const TokenProviderContext = createContext<TokenProviderContextProps>({} as TokenProviderContextProps)

const TokenProvider: React.FC<Omit<React.ComponentPropsWithRef<typeof TokenProviderContext.Provider>, 'value'>> = (
  props
) => {
  const { isConnected } = useAccount()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const projects = useAtomValue(projectsAtom)

  const project = useMemo(() => projects.find((project) => project.id === Number(id)) || projects[0], [id, projects])

  const tokenInfo = useTokenBaseInfo(project)
  const tokenUserInfo = useTokenUserInfo(project)
  const { data: reward } = useReward(project)
  const { data: userReward } = useUserReward(project)

  useEffect(() => {
    // id 不正确，重定向到第一个token
    if (id && project && Number(id) !== project.id) navigate(ROUTE_PATH.TOKEN + `/${project.id}`, { replace: true })
  }, [id, navigate, project])

  return (
    <TokenProviderContext.Provider
      value={{
        project,
        tokenId: Number(id),
        tokenInfo: tokenInfo,
        tokenUserInfo: isConnected ? tokenUserInfo : undefined,
        reward: reward,
        userReward: isConnected ? userReward : undefined
      }}
      {...props}
    />
  )
}

export default TokenProvider

export const useTokenProviderContext = () => useContext(TokenProviderContext)
