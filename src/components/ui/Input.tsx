import React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputVariants = cva(
  cn(
    'flex items-center space-x-2 border border-border rounded-sm bg-background-input transition-all',
    'focus-within:border-primary',
    // 'focus-within:shadow-primary/50 focus-within:shadow-[0_0_32px_0]',
    '[&_input]:h-full'
  ),
  {
    variants: {
      size: {
        xs: 'h-7 text-sm [&_input]:text-sm px-2',
        sm: 'h-8 text-sm [&_input]:text-sm px-2',
        md: 'h-10 text-base [&_input]:text-sm px-3',
        lg: 'h-12 text-base [&_input]:text-base px-4'
      }
    },
    defaultVariants: {
      size: 'sm'
    }
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  prefixNode?: React.ReactNode
  suffixNode?: React.ReactNode
  wrapperClassName?: React.LabelHTMLAttributes<HTMLLabelElement>['className']
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ prefixNode, suffixNode, size, wrapperClassName, ...rest }, ref) => (
    <label className={cn(inputVariants({ className: wrapperClassName, size }))}>
      {prefixNode}
      <input {...rest} ref={ref} className={cn('grow bg-transparent', rest?.className)} />
      {suffixNode}
    </label>
  )
)
