import React, { createContext, useContext } from 'react'

import { useParams } from 'react-router'

import { TokenInfo, TokenUserInfo } from '@/hooks/contracts/types'
import { useTokenBaseInfo, useTokenUserInfo } from '@/hooks/contracts/useInfoContract'

export interface TokenProviderContextProps {
  tokenId: number
  tokenInfo: TokenInfo | undefined
  tokenUserInfo: TokenUserInfo | undefined
}

const TokenProviderContext = createContext<TokenProviderContextProps>({
  tokenId: 0,
  tokenInfo: undefined,
  tokenUserInfo: undefined
})

const TokenProvider: React.FC<Omit<React.ComponentPropsWithRef<typeof TokenProviderContext.Provider>, 'value'>> = (
  props
) => {
  const { id } = useParams<{ id: string }>()
  const tokenInfo = useTokenBaseInfo(Number(id))
  const tokenUserInfo = useTokenUserInfo(Number(id))

  console.log('>>>>>> tokenInfo: ', tokenInfo)
  console.log('>>>>>> tokenUserInfo: ', tokenUserInfo)

  return <TokenProviderContext.Provider value={{ tokenId: Number(id), tokenInfo, tokenUserInfo }} {...props} />
}

export default TokenProvider

export const useTokenProviderContext = () => useContext(TokenProviderContext)
