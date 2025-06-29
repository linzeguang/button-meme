import type React from 'react'

import { useAccount, useBalance } from 'wagmi'

import { HarmonyOSSansText } from '@/components/ui/Text'
import { cn } from '@/lib/utils'

import type { Address } from 'viem'

export const SimpleBalance: React.FC<
  {
    token?: string
    renderBalance?: (data?: { decimals: number; formatted: string; symbol: string; value: bigint }) => void
  } & React.ComponentProps<typeof HarmonyOSSansText>
> = ({ token, className, renderBalance, ...props }) => {
  const { address } = useAccount()
  const { data, isLoading } = useBalance({
    address: address,
    token: token as Address
  })

  return (
    <HarmonyOSSansText className={cn('text-xs', className)} {...props}>
      {isLoading ? <>--</> : (renderBalance ? renderBalance(data) : data?.formatted) || '--'}
    </HarmonyOSSansText>
  )
}
