import React, { type ComponentPropsWithoutRef, type ComponentRef } from 'react'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cva, type VariantProps } from 'class-variance-authority'

const SwitchRoot = SwitchPrimitive.Root
const SwitchThumb = SwitchPrimitive.Thumb

const switchVariants = cva('relative rounded-full bg-white/80 box-content p-0.5', {
  variants: {
    variant: {
      primary: 'data-[state=checked]:bg-primary'
    },
    size: {
      sm: 'h-3 w-6',
      md: 'h-4 w-8',
      lg: 'h-5 w-10'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
})

const switchThumbVariant = cva(
  'absolute top-0.5 left-0.5 rounded-full bg-white transition-all data-[state=checked]:translate-x-full',
  {
    variants: {
      size: {
        sm: 'size-3',
        md: 'size-4',
        lg: 'size-5'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

export interface SwitchProps extends ComponentPropsWithoutRef<typeof SwitchRoot>, VariantProps<typeof switchVariants> {
  size?: VariantProps<typeof switchVariants>['size'] & VariantProps<typeof switchThumbVariant>['size']
  thumbClassName?: ComponentPropsWithoutRef<typeof SwitchThumb>['className']
}

export const Switch = React.forwardRef<ComponentRef<typeof SwitchRoot>, SwitchProps>((props, ref) => {
  const { className, thumbClassName, variant, size, ...rest } = props
  return (
    <SwitchRoot ref={ref} className={switchVariants({ size, variant, className })} {...rest}>
      <SwitchThumb className={switchThumbVariant({ size, className: thumbClassName })} />
    </SwitchRoot>
  )
})
Switch.displayName = SwitchRoot.displayName
