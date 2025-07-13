import React from 'react'

import Header from '@/layouts/Header'
import Main from '@/layouts/Main'
import SideBar from '@/layouts/SideBar'

const RootLayout: React.FC = () => {
  return (
    <section className="grid h-screen grid-cols-[auto_1fr] grid-rows-[4.5rem_1fr]">
      <Header />
      <SideBar />
      <Main />
    </section>
  )
}

export default RootLayout
