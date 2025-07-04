import React from 'react'

import { SimpleBalance } from '@/components/common/Balance'
import { Icon } from '@/components/svgr'
import { Flex, Grid } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Dividing } from '@/components/ui/Dividing'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { useWallet } from '@/hooks/useWallet'
import { formatAddress, formatNumber } from '@/lib/format'

const ConnectWallet: React.FC = () => {
  const { address, isConnected, connect, view } = useWallet()

  if (isConnected && address)
    return (
      <Flex className="h-full items-center">
        <Dividing orientation="vertical" />
        <Grid className="grid-cols-[1fr_auto] grid-rows-2 gap-x-2 px-7.5 text-right">
          <HarmonyOSSansText>{formatAddress(address)}</HarmonyOSSansText>
          <Icon.User className="row-span-2 size-11.5" />
          <SimpleBalance
            className="text-primary text-base"
            renderBalance={(data) => data && `${formatNumber(data.formatted, 6)} ${data.symbol}`}
          />
        </Grid>
        <Dividing orientation="vertical" />
        <Button className="-mr-6 px-9" ghost onClick={view}>
          <Icon.More className="text-primary" />
        </Button>
      </Flex>
    )

  return (
    <Button variant="primary" className="font-HarmonyOSSans" onClick={connect}>
      Connect Wallet
    </Button>
  )
}

export default ConnectWallet
