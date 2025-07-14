import React from 'react'

import { useLocation } from 'react-router'

import { FooterTrade } from '@/components/token/Trade'
import { ROUTE_PATH } from '@/routes'

const Footer: React.FC = () => {
  const { pathname } = useLocation()

  return <footer className="footer">{pathname.includes(ROUTE_PATH.TOKEN) && <FooterTrade />}</footer>
}

export default Footer
