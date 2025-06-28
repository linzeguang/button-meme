import { lazy } from 'react'

import { createBrowserRouter } from 'react-router'

import RootLayout from '@/layouts'

export enum RoutePath {
  Root = '/'
}

export const router = createBrowserRouter([
  {
    path: RoutePath.Root,
    Component: RootLayout,
    children: [
      {
        index: true,
        path: RoutePath.Root,
        Component: lazy(() => import('@/pages/home'))
      }
    ]
  }
])
