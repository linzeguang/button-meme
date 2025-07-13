import React from 'react'

import { MobileConnected } from '@/components/settings/ConnectWallet'
import { Icon } from '@/components/svgr'
import { Flex } from '@/components/ui/Box'
import { DrawerClose, DrawerContent, DrawerRoot, DrawerTrigger } from '@/components/ui/Drawer'
import Nav from '@/layouts/Nav'

const Menu: React.FC = () => {
  return (
    <DrawerRoot direction="right">
      <DrawerTrigger>
        <Icon.Menu />
      </DrawerTrigger>
      <DrawerContent className="grid grid-rows-[auto_1fr] p-4">
        <Flex className="mb-10 items-center justify-between">
          <DrawerClose>
            <Icon.Close />
          </DrawerClose>
          <MobileConnected />
        </Flex>
        <Nav collapsed={false} className="overflow-y-scroll" />
      </DrawerContent>
    </DrawerRoot>
  )
}

export default Menu
