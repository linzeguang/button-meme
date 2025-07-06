import React from 'react'

import { Icon } from '@/components/svgr'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

export const SearchToken: React.FC<React.ComponentProps<typeof Input>> = ({ className, wrapperClassName, ...rest }) => {
  return (
    <Input
      size="sm"
      wrapperClassName={cn('border-border', wrapperClassName)}
      className={cn('placeholder:text-text-placeholder', className)}
      prefixNode={<Icon.Search className="text-text-tertiary" />}
      placeholder="Type token symbol, address to find"
      {...rest}
    />
  )
}

export const SearchHolder: React.FC<React.ComponentProps<typeof Input>> = ({ className, ...rest }) => {
  return (
    <Input
      size="sm"
      wrapperClassName="border-border"
      className={cn('placeholder:text-text-placeholder', className)}
      prefixNode={<Icon.Search className="text-text-tertiary" />}
      placeholder="输入地址查询"
      {...rest}
    />
  )
}
