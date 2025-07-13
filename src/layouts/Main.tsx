import React from 'react'

import { Outlet } from 'react-router'

import { Container } from '@/components/ui/Box'

const Main: React.FC = () => {
  return (
    <main className="overflow-auto">
      <Container className="py-6 lg:py-10">
        <Outlet />
      </Container>
    </main>
  )
}

export default Main
