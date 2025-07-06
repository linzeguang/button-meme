import React from 'react'

import * as Slot from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textVariants = cva('', {
  variants: {
    variant: {
      default: 'text-text-primary',
      primary: 'text-primary',
      secondary: 'text-text-secondary',
      tertiary: 'text-text-tertiary',
      disabled: 'text-text-disabled:',
      info: 'text-info',
      success: 'text-success',
      destructive: 'text-destructive',
      warning: 'text-warning'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  asChild?: boolean
  as?: 'span' | 'div' | 'label' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Text = React.forwardRef<React.ElementRef<'span'>, TextProps>(
  ({ className, children, as: Tag = 'p', asChild, variant, ...rest }, ref) => (
    <Slot.Root ref={ref} className={cn(textVariants({ className, variant }))} {...rest}>
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  )
)
Text.displayName = 'Text'

export const HarmonyOSSansText = React.forwardRef<
  React.ComponentRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>((props, ref) => <Text {...props} ref={ref} className={cn('font-HarmonyOSSans', props.className)} />)
