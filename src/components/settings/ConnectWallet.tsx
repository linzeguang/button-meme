import React from 'react'

import { Icon } from '@/components/svgr'
import { Button } from '@/components/ui/Button'
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/DropdownMenu'
import { FunnelDisplayText } from '@/components/ui/Text'
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
            <Button className="font-FunnelDisplay" variant="primary" onClick={() => disconnect()}>
              {formatAddress(address)}
              {/* <Icon.SelectorArrow /> */}
            </Button>
          )
        }}
        content={{
          align: 'end',
          className: 'space-y-2'
        }}
      >
        {/* <DropdownMenuItem className="flex items-center gap-2">
          <Icon.Profile />
          <FunnelDisplayText className="text-sm">Profile</FunnelDisplayText>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Icon.Copy />
          <FunnelDisplayText className="text-sm" onClick={() => copy(address!)}>
            Copy address
          </FunnelDisplayText>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-destructive text-destructive flex items-center gap-2">
          <Icon.Disconnect />
          <FunnelDisplayText className="text-sm" onClick={() => disconnect()}>
            Disconnect
          </FunnelDisplayText>
        </DropdownMenuItem> */}
      </DropdownMenu>
    )

  return (
    <Button variant="primary" className="font-FunnelDisplay" onClick={connect}>
      Connect Wallet
    </Button>
  )
}

export default ConnectWallet
