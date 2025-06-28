import React, { useImperativeHandle, useState } from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'

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
      'overlay fixed top-0 right-0 bottom-0 left-0 z-[998]',
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
            'fixed top-1/2 left-1/2 z-[999] -translate-1/2',
            'border-border popover rounded-md border p-4',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-1/4',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-1/4',
            content?.className
          )}
        >
          <DialogPrimitive.Title
            className={cn(
              'relative flex min-h-8 items-center pr-8 pb-4 text-xl font-semibold',
              !title && !closeable && 'min-h-auto pb-0'
            )}
          >
            {title}
            {closeable && (
              <DialogClose asChild>
                <Button
                  ghost
                  size="xs"
                  shadow={false}
                  className={cn('absolute right-0 size-6 border-0 !p-0 backdrop-blur-none', !title && 'top-0')}
                >
                  {/* <Icon.Close /> */}
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
