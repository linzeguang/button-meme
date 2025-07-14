import React, { PropsWithChildren } from 'react'

import { useProjects } from '@/hooks/contracts/useInfoContract'

const HelperProvider: React.FC<PropsWithChildren> = ({ children }) => {
  useProjects()

  return <>{children}</>
}

export default HelperProvider
