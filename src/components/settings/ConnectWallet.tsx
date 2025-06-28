import React from 'react'

import { Icon } from '@/components/svgr'
import { Button } from '@/components/ui/Button'
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/DropdownMenu'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { useWallet } from '@/hooks/useWallet'
import { formatAddress } from '@/lib/format'
import { copy } from '@/lib/utils'

const ConnectWallet: React.FC = () => {
  const { address, isConnected, connect, disconnect } = useWallet()

  if (isConnected && address)
    return (
      <DropdownMenu
        trigger={{
          asChild: true,
          children: (
            <Button className="font-HarmonyOSSans" variant="primary" onClick={() => disconnect()}>
              {formatAddress(address)}
            </Button>
          )
        }}
        content={{
          align: 'end',
          className: 'space-y-2'
        }}
      >
        <DropdownMenuItem className="flex items-center gap-2">
          <Icon.Copy />
          <HarmonyOSSansText className="text-sm" onClick={() => copy(address!)}>
            Copy address
          </HarmonyOSSansText>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-destructive text-destructive flex items-center gap-2">
          {/* <Icon.Disconnect /> */}
          <HarmonyOSSansText className="text-sm" onClick={() => disconnect()}>
            Disconnect
          </HarmonyOSSansText>
        </DropdownMenuItem>
      </DropdownMenu>
    )

  return (
    <Button variant="primary" className="font-HarmonyOSSans" onClick={connect}>
      Connect Wallet
    </Button>
  )
}

export default ConnectWallet
