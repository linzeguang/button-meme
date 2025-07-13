import { lazy } from 'react'

import { createBrowserRouter, Navigate } from 'react-router'

import RootLayout from '@/layouts'

export enum ROUTE_PATH {
  HOME = '/',
  TOKEN = '/token'
}

export const router = createBrowserRouter([
  {
    path: ROUTE_PATH.HOME,
    Component: RootLayout,
    children: [
      {
        index: true,
        path: ROUTE_PATH.HOME,
        // Component: lazy(() => import('@/pages/home'))
        Component: () => <Navigate to={ROUTE_PATH.TOKEN + `/0x3e7712cf29164432efc6ef0aa669c10b674efe43`} />
      },
      {
        path: ROUTE_PATH.TOKEN,
        Component: () => <Navigate to={ROUTE_PATH.HOME} replace />
      },
      {
        path: ROUTE_PATH.TOKEN + `/:tokenAddress`,
        Component: lazy(() => import('@/pages/token'))
      }
    ]
  }
])
