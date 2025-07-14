import React from 'react'

import useMediaQuery from '@/hooks/useMediaQuery'
import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import Main from '@/layouts/Main'
import SideBar from '@/layouts/SideBar'

const RootLayout: React.FC = () => {
  const { isMobile } = useMediaQuery()

  return (
    <section className="grid h-screen grid-rows-[4.5rem_1fr_auto] lg:grid-cols-[auto_1fr] lg:grid-rows-[4.5rem_1fr]">
      <Header className="lg:col-span-full" />
      {!isMobile && <SideBar className="lg:col-span-1" />}
      <Main />
      {isMobile && <Footer />}
    </section>
  )
}

export default RootLayout
