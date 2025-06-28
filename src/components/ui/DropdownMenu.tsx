import React, { type ComponentPropsWithoutRef, type ElementRef, type PropsWithChildren } from 'react'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

import { cn } from '@/lib/utils'

const DropdownMenuRoot = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuContent = DropdownMenuPrimitive.Content

export const DropdownMenuItem = React.forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>((props, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    {...props}
    className={cn(
      'hover:bg-primary cursor-pointer rounded-lg px-2 py-1 transition-all hover:text-white',
      props.className
    )}
  />
))
DropdownMenuItem.displayName = 'DropdownMenuItem'

export interface DropdownMenuProps extends ComponentPropsWithoutRef<typeof DropdownMenuRoot>, PropsWithChildren {
  trigger?: ComponentPropsWithoutRef<typeof DropdownMenuTrigger>
  content?: ComponentPropsWithoutRef<typeof DropdownMenuContent>
}

export const DropdownMenu = React.forwardRef<ElementRef<typeof DropdownMenuContent>, DropdownMenuProps>(
  (props, ref) => {
    const { children, trigger, content, ...rest } = props
    return (
      <DropdownMenuRoot {...rest}>
        {trigger && <DropdownMenuTrigger {...trigger} />}

        <DropdownMenuPortal>
          <DropdownMenuContent
            ref={ref}
            sideOffset={4}
            {...content}
            className={cn(
              'popover rounded-lg border border-white p-2',
              'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              content?.className
            )}
          >
            {children}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
    )
  }
)
DropdownMenu.displayName = 'DropdownMenu'
