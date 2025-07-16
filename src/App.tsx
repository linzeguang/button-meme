import React, { useEffect } from 'react'

import { createPortal } from 'react-dom'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router'

import { useTheme } from '@/hooks/useTheme'
import { router } from '@/routes'

const App: React.FC = () => {
  const { theme, changeTheme } = useTheme()

  useEffect(() => {
    changeTheme(theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <RouterProvider router={router} />
      {createPortal(
        <Toaster
          toastOptions={{
            style: {
              background: 'var(--color-background-popover)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border)'
            },
            removeDelay: 60 * 1000
          }}
        />,
        document.body
      )}
    </React.Fragment>
  )
}

export default App
