import React from 'react'

import ConnectWallet from '@/components/settings/ConnectWallet'
import { Container } from '@/components/ui/Box'

const Header: React.FC = () => {
  return (
    <header className="header col-span-1 row-span-1">
      <Container className="flex h-full items-center justify-end gap-2">
        <ConnectWallet />
      </Container>
    </header>
  )
}

export default Header
