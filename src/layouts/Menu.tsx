import React, { useState } from 'react'

import { MobileConnected } from '@/components/settings/ConnectWallet'
import { Icon } from '@/components/svgr'
import { Flex } from '@/components/ui/Box'
import { DrawerClose, DrawerContent, DrawerRoot, DrawerTrigger } from '@/components/ui/Drawer'
import Nav from '@/layouts/Nav'

const Menu: React.FC = () => {
  const [open, setOpen] = useState(false)
  return (
    <DrawerRoot direction="right" open={open} onOpenChange={setOpen}>
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
        <Nav
          collapsed={false}
          className="overflow-y-scroll"
          closeMenu={() => {
            setOpen(false)
          }}
        />
      </DrawerContent>
    </DrawerRoot>
  )
}

export default Menu
