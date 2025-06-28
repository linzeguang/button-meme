import { useMemo } from 'react'

import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import { erc20Abi } from 'viem'
import { useReadContract } from 'wagmi'

import { assume0xAddress } from '../utils/wagmi'

export const useTokenAllowance = (token?: Token, owner?: string, spender?: string) => {
  const queryEnabled = !!owner && !!spender
  const { data: allowance } = useReadContract({
    abi: erc20Abi,
    chainId: token?.chainId,
    functionName: 'allowance',
    address: assume0xAddress(token?.address),
    args: queryEnabled ? [assume0xAddress(owner), assume0xAddress(spender)] : undefined,
    query: { enabled: queryEnabled }
  })

  return useMemo(
    () => (token && allowance !== undefined ? CurrencyAmount.fromRawAmount(token, allowance.toString()) : undefined),
    [allowance, token]
  )
}
