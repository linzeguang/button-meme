import React from 'react'

import ConnectWallet from '@/components/settings/ConnectWallet'
import { Logo } from '@/components/svgr'
import { Container, Flex } from '@/components/ui/Box'
import useMediaQuery from '@/hooks/useMediaQuery'
import Menu from '@/layouts/Menu'
import { cn } from '@/lib/utils'

const Header: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  const { isMobile } = useMediaQuery()

  return (
    <header {...props} className={cn('header', props.className)}>
      <Container className="flex h-full items-center justify-between gap-2">
        {/* {!isMobile ? <Logo.Withname className="text-primary" /> : <Logo.Icon className="text-primary" />} */}
        <Logo.Withname className="text-primary" />
        <Flex className="gap-6">
          <ConnectWallet />
          {isMobile && <Menu />}
        </Flex>
      </Container>
    </header>
  )
}

export default Header
