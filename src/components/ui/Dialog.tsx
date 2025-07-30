import React, { useImperativeHandle, useState } from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'

import { Icon } from '@/components/svgr'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const DialogRoot = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'overlay fixed bottom-0 left-0 right-0 top-0 z-[998]',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

export interface DialogMethods {
  isOpen: boolean
  open: () => void
  close: () => void
}

export interface DialogProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>,
    React.PropsWithChildren {
  closeable?: boolean
  title?: React.ReactNode
  trigger?: React.ComponentPropsWithoutRef<typeof DialogTrigger>
  content?: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
}

export const Dialog = React.forwardRef<DialogMethods, DialogProps>((props, methods) => {
  const { trigger, content, title, children, closeable = true, ...rest } = props
  const [isOpen, setIsOpen] = useState(false)

  useImperativeHandle(
    methods,
    () => ({
      isOpen: props.open ?? isOpen,
      open: () => {
        if (props.onOpenChange) props.onOpenChange(true)
        else setIsOpen(true)
      },
      close: () => {
        if (props.onOpenChange) props.onOpenChange(true)
        else setIsOpen(false)
      }
    }),
    [isOpen, props]
  )

  return (
    <DialogRoot open={isOpen} onOpenChange={setIsOpen} {...rest}>
      {trigger && <DialogTrigger {...trigger} />}
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          {...content}
          className={cn(
            'fixed left-1/2 top-1/2 z-[999] -translate-x-1/2 -translate-y-1/2',
            'popover border-border rounded-md border p-4',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
            'max-h-[90%] w-[90vw] max-w-[90vw] overflow-x-auto md:w-auto',
            content?.className
          )}
        >
          <DialogPrimitive.Title
            className={cn(
              'relative flex min-h-8 items-center pb-4 pr-8 text-xl font-semibold',
              !title && !closeable && 'min-h-auto pb-0'
            )}
          >
            {title}
            {closeable && (
              <DialogClose asChild>
                <Button
                  ghost
                  size="xs"
                  className={cn('absolute right-0 size-6 border-0 !p-0 backdrop-blur-none', !title && 'top-0')}
                >
                  <Icon.Close />
                </Button>
              </DialogClose>
            )}
          </DialogPrimitive.Title>

          {children}
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogRoot>
  )
})
