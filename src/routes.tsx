import { lazy } from 'react'

import { createBrowserRouter, Navigate } from 'react-router'

import RootLayout from '@/layouts'

export enum RoutePath {
  Root = '/',
  Swap = '/swap'
}

export const router = createBrowserRouter([
  {
    path: RoutePath.Root,
    Component: RootLayout,
    children: [
      // {
      //   index: true,
      //   Component: () => <Navigate to={RoutePath.Swap} replace />
      // },
      {
        index: true,
        path: RoutePath.Root,
        Component: lazy(() => import('@/pages/home'))
      },
      {
        path: RoutePath.Swap,
        Component: lazy(() => import('@/pages/swap'))
      }
    ]
  }
])
