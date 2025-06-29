import React from 'react'

import { Icon } from '@/components/svgr'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

const SearchToken: React.FC<React.ComponentProps<typeof Input>> = ({ className, ...rest }) => {
  return (
    <Input
      size="sm"
      className={cn('placeholder:text-text-placeholder', className)}
      prefixNode={<Icon.Search className="text-text-tertiary" />}
      placeholder="Type token symbol, address to find"
      {...rest}
    />
  )
}

export default SearchToken
