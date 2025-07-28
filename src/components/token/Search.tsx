import React from 'react'

import { t } from '@lingui/core/macro'

import { Icon } from '@/components/svgr'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

export const SearchToken: React.FC<React.ComponentProps<typeof Input>> = ({ className, wrapperClassName, ...rest }) => {
  return (
    <Input
      size="sm"
      wrapperClassName={cn(wrapperClassName)}
      className={cn('placeholder:text-text-placeholder', className)}
      prefixNode={<Icon.Search className="text-text-tertiary" />}
      placeholder={t`Type token symbol, address to find`}
      {...rest}
    />
  )
}

export const SearchHolder: React.FC<React.ComponentProps<typeof Input>> = ({ className, ...rest }) => {
  return (
    <Input
      size="sm"
      className={cn('placeholder:text-text-placeholder font-normal', className)}
      prefixNode={<Icon.Search className="text-text-tertiary" />}
      placeholder={t`Enter address to query`}
      {...rest}
    />
  )
}
