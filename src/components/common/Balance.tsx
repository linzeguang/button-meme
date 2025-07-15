import type React from 'react'

import { useAccount, useBalance } from 'wagmi'

import { Icon } from '@/components/svgr'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { ENV_PARAMS } from '@/constants/evnParams'
import { cn } from '@/lib/utils'

import type { Address } from 'viem'

export const SimpleBalance: React.FC<
  {
    prefix?: string
    token?: string
    renderBalance?: (data?: { decimals: number; formatted: string; symbol: string; value: bigint }) => void
  } & React.ComponentProps<typeof HarmonyOSSansText>
> = ({ prefix, token, className, renderBalance, ...props }) => {
  const { address } = useAccount()
  const { data, isLoading } = useBalance({
    chainId: ENV_PARAMS.CHAIN_ID,
    address: address,
    token: token as Address
  })

  return (
    <HarmonyOSSansText className={cn('flex items-center gap-1', 'text-xs', className)} {...props}>
      {prefix && <span>{prefix}</span>}
      {isLoading ? <Icon.Copy /> : (renderBalance ? renderBalance(data) : data?.formatted) || '--'}
    </HarmonyOSSansText>
  )
}
