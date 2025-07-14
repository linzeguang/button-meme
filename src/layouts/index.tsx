import React from 'react'

import useMediaQuery from '@/hooks/useMediaQuery'
import Header from '@/layouts/Header'
import Main from '@/layouts/Main'
import SideBar from '@/layouts/SideBar'

const RootLayout: React.FC = () => {
  const { isMobile } = useMediaQuery()

  return (
    <section className="grid h-screen grid-rows-[4.5rem_1fr] lg:grid-cols-[auto_1fr]">
      <Header className="lg:col-span-full" />
      {!isMobile && <SideBar className="lg:col-span-1" />}
      <Main />
      {/* {isMobile && } */}
    </section>
  )
}

export default RootLayout
