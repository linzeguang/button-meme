import React from 'react'

import { Icon } from '@/components/svgr'
import { Button } from '@/components/ui/Button'
import { FunnelDisplayText } from '@/components/ui/Text'

const PriorityFeeSetting: React.FC = () => {
  return (
    <Button className="text-text-icon gap-4 rounded-full pl-4">
      <FunnelDisplayText className="text-sm">Priority Fee</FunnelDisplayText>
      <Icon.Priorityfee className="text-text-icon" />
    </Button>
  )
}

export default PriorityFeeSetting
