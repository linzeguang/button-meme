import { lazy } from 'react'

import { createHashRouter, Navigate } from 'react-router'

import RootLayout from '@/layouts'

export enum ROUTE_PATH {
  HOME = '/',
  TOKEN = '/token'
}

export const router = createHashRouter([
  {
    path: ROUTE_PATH.HOME,
    Component: RootLayout,
    children: [
      {
        index: true,
        path: ROUTE_PATH.HOME,
        // Component: lazy(() => import('@/pages/home'))
        Component: () => <Navigate to={ROUTE_PATH.TOKEN + `/1`} />
      },
      {
        path: ROUTE_PATH.TOKEN,
        Component: () => <Navigate to={ROUTE_PATH.HOME} replace />
      },
      {
        path: ROUTE_PATH.TOKEN + `/:id`,
        Component: lazy(() => import('@/pages/token'))
      }
    ]
  }
])
