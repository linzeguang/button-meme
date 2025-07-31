import React from 'react'

import { Outlet } from 'react-router'

import { Container } from '@/components/ui/Box'

const Main: React.FC = () => {
  return (
    <main id="main" className="main overflow-auto">
      <Container className="py-6">
        <Outlet />
      </Container>
    </main>
  )
}

export default Main
