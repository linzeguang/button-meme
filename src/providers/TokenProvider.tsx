import React, { createContext, useContext } from 'react'

import { useParams } from 'react-router'

export interface TokenProviderContextProps {
  tokenAddress: string
}

const TokenProviderContext = createContext<TokenProviderContextProps>({
  tokenAddress: ''
})

const TokenProvider: React.FC<Omit<React.ComponentPropsWithRef<typeof TokenProviderContext.Provider>, 'value'>> = (
  props
) => {
  const { tokenAddress } = useParams<{ tokenAddress: string }>()

  return <TokenProviderContext.Provider value={{ tokenAddress: tokenAddress! }} {...props} />
}

export default TokenProvider

export const useTokenProviderContext = () => useContext(TokenProviderContext)
