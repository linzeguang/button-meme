import { useCallback } from 'react'

import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react'

export const useWallet = () => {
  const account = useAppKitAccount()
  const { open } = useAppKit()
  const { disconnect } = useDisconnect()

  const connect = useCallback(() => {
    open({ view: 'Connect', namespace: 'eip155' })
  }, [open])

  const view = useCallback(() => {
    open({ view: 'Account', namespace: 'eip155' })
  }, [open])

  return {
    view,
    connect,
    disconnect,
    ...account
  }
}
