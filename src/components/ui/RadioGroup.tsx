import React, { useId } from 'react'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cva, type VariantProps } from 'class-variance-authority'

import { Flex } from '@/components/ui/Box'
import { cn } from '@/lib/utils'

export const RadioGroupRoot = RadioGroupPrimitive.Root
export const RadioGroupItem = RadioGroupPrimitive.Item
export const RadioGroupIndicator = RadioGroupPrimitive.Indicator

const radioGroupVariants = cva(cn('flex'), {
  variants: {
    variant: {
      default: '',
      button: ''
    },
    orientation: {
      horizontal:
        'flex-row bg-background-fourth rounded-sm overflow-hidden [&_.item-wrapper]:flex-1 [&_.item-wrapper]:relative [&_.item]:size-full [&_.label]:absolute [&_.label]:top-1/2 [&_.label]:left-1/2 [&_.label]:-translate-1/2', // 水平
      vertical: 'flex-col' // 垂直
    },
    size: {
      md: 'h-10'
    }
  },
  defaultVariants: {
    variant: 'default',
    orientation: 'horizontal',
    size: 'md'
  }
})

export interface RadioOption {
  value: string
  label: React.ReactNode
  className?: string
  wrapperClassName?: string
}

export interface RadioGroupProps
  extends React.ComponentPropsWithRef<typeof RadioGroupRoot>,
    VariantProps<typeof radioGroupVariants> {
  options: RadioOption[]
  orientation?: 'horizontal' | 'vertical'
}

export const RadioGroup = React.forwardRef<React.ComponentRef<typeof RadioGroupRoot>, RadioGroupProps>((props, ref) => {
  const { className, variant, options, orientation, size, ...rest } = props
  const id = useId()

  return (
    <RadioGroupRoot ref={ref} className={radioGroupVariants({ className, variant, orientation, size })} {...rest}>
      {options.map(({ value, label, className, wrapperClassName }) => (
        <Flex
          key={`${value}-${id}`}
          className={cn('item-wrapper', wrapperClassName)}
          data-state={value === rest.value ? 'checked' : 'unchecked'}
        >
          <RadioGroupItem value={value} id={`${value}-${id}`} className={cn('item cursor-pointer', className)}>
            <RadioGroupIndicator />
          </RadioGroupItem>
          <label htmlFor={`${value}-${id}`} className="label text-text-secondary">
            {label}
          </label>
        </Flex>
      ))}
    </RadioGroupRoot>
  )
})
