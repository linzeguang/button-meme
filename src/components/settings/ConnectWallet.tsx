import React from 'react'

import { Trans } from '@lingui/react/macro'

import { SimpleBalance } from '@/components/common/Balance'
import { Icon } from '@/components/svgr'
import { Flex, Grid } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Dividing } from '@/components/ui/Dividing'
import { HarmonyOSSansText } from '@/components/ui/Text'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useWallet } from '@/hooks/useWallet'
import { formatAddress, formatNumber } from '@/lib/format'

export const MobileConnected = () => {
  const { address } = useWallet()

  return (
    <Grid className="grid-cols-[1fr_auto] grid-rows-2 gap-x-1.5 text-right">
      <HarmonyOSSansText className="text-xs">{formatAddress(address)}</HarmonyOSSansText>
      <Icon.User className="size-8.5 row-span-2" />
      <SimpleBalance
        className="text-primary text-xs"
        renderBalance={(data) => data && `${formatNumber(data.formatted, 6)} ${data.symbol}`}
      />
    </Grid>
  )
}

const ConnectWallet: React.FC = () => {
  const { isMobile } = useMediaQuery()
  const { address, isConnected, connect, view } = useWallet()

  if (isConnected && address)
    return isMobile ? (
      <div onClick={view}>
        <MobileConnected />
      </div>
    ) : (
      <Flex className="h-full items-center">
        <Dividing orientation="vertical" />
        <Grid className="px-7.5 grid-cols-[1fr_auto] grid-rows-2 gap-x-2 text-right">
          <HarmonyOSSansText>{formatAddress(address)}</HarmonyOSSansText>
          <Icon.User className="size-11.5 row-span-2" />
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
    <Button variant="primary" size={isMobile ? 'sm' : 'md'} className="font-HarmonyOSSans" onClick={connect}>
      <Trans>Connect Wallet</Trans>
    </Button>
  )
}

export default ConnectWallet
