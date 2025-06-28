import React from 'react'

// import { LeftTopCircle, RightBottomCircle } from '@/layouts/FixedCircle'
import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import Main from '@/layouts/Main'
import SideBar from '@/layouts/SideBar'

const RootLayout: React.FC = () => {
  return (
    <>
      <section className="section grid h-screen grid-cols-[auto_1fr] grid-rows-[4.5rem_1fr_2rem]">
        <Header />
        <SideBar />
        <Main />
        <Footer />
      </section>
      {/* <RightBottomCircle />
      <LeftTopCircle /> */}
    </>
  )
}

export default RootLayout
