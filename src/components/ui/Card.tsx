import React from 'react'

import { Flex } from '@/components/ui/Box'
import { cn } from '@/lib/utils'

const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { title?: React.ReactNode }> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={cn('card', className)} {...rest}>
      <Flex></Flex>
      {children}
    </div>
  )
}

export default Card
