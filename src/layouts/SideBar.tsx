import React, { useMemo, useState } from 'react'

import { Icon } from '@/components/svgr'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true)

  const sidebarWidth = useMemo(() => (collapsed ? 'w-45 px-6' : 'w-20 px-4'), [collapsed])

  return (
    <aside
      className={cn('aside col-span-1 row-span-full py-10 transition-all', sidebarWidth)}
      data-collapsed={collapsed}
    >
      <Button size="xxs" className="w-6 px-0" onClick={() => setCollapsed(!collapsed)}>
        <Icon.Collapse />
      </Button>
    </aside>
  )
}

export default SideBar
