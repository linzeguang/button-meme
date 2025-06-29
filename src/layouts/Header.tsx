import React from 'react'

import ConnectWallet from '@/components/settings/ConnectWallet'
import { Logo } from '@/components/svgr'
import { Container } from '@/components/ui/Box'

const Header: React.FC = () => {
  return (
    <header className="header col-span-2">
      <Container className="flex h-full items-center justify-between gap-2">
        <Logo.Withname className="text-primary" />
        <ConnectWallet />
      </Container>
    </header>
  )
}

export default Header
