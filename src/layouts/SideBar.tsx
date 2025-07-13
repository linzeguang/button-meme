import React, { useRef, useState } from 'react'

import Nav from '@/layouts/Nav'
import { cn } from '@/lib/utils'

const SideBar: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [collapsed, setCollapsed] = useState(true)
  const navRef = useRef<React.ComponentRef<typeof Nav>>(null)

  return (
    <div {...props} className={cn('relative w-14', props.className)}>
      <aside
        className={cn(
          'absolute z-10 h-full',
          'aside px-2 py-3 transition-all [&_*]:transition-all',
          'data-[collapsed=false]:w-50 data-[collapsed=true]:w-14'
        )}
        data-collapsed={collapsed}
        onMouseEnter={() => {
          setCollapsed(false)
        }}
        onMouseLeave={() => {
          setCollapsed(true)
          navRef.current?.closeAccordion()
        }}
      >
        <Nav ref={navRef} collapsed={collapsed} />
      </aside>
    </div>
  )
}

export default SideBar
