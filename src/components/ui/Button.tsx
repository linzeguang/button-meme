import React, { type ButtonHTMLAttributes } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { Icon } from '@/components/svgr'
import { Grid } from '@/components/ui/Box'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'px-2 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 border ',
  {
    variants: {
      variant: {
        default:
          'bg-white/50 border-white backdrop-blur-sm shadow-sm shadow-primary/15 hover:text-white hover:bg-primary',
        primary: 'bg-primary border-primary hover:bg-primary/90 text-white shadow-md shadow-primary/50',
        secondary: 'bg-background-secondary border-white hover:bg-background-secondary/90'
      },
      size: {
        xxs: 'h-6 text-xs space-x-1 rounded-sm',
        xs: 'h-7 text-sm space-x-1 rounded-sm',
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-base'
      },
      outline: {
        true: 'border-white/10 bg-white/1 backdrop-blur-md'
      },
      ghost: {
        true: 'bg-transparent'
      },
      shadow: {
        false: 'shadow-none'
      }
    },
    compoundVariants: [
      {
        outline: true,
        variant: 'primary',
        className: 'bg-primary/10 border-primary text-primary hover:text-white hover:bg-primary'
      }
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shadow: true
    }
  }
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, ghost, outline, size, shadow, variant, ...rest } = props
  return (
    <button ref={ref} className={cn(buttonVariants({ ghost, outline, size, shadow, variant, className }))} {...rest} />
  )
})

interface BaseOption {
  label: React.ReactNode
  value: number | string
}

export interface ButtonRadioProps<D extends BaseOption = BaseOption> extends React.HTMLAttributes<HTMLDivElement> {
  options: D[]
  value?: D['value']
  optionProps?: ButtonProps
  onValueChange?: (value: D['value'], option: D) => void
}

export const ButtonRadio = <D extends BaseOption = BaseOption>({
  optionProps,
  options,
  value: currentValue,
  onValueChange,
  ...rest
}: ButtonRadioProps<D>) => {
  return (
    <Grid {...rest}>
      {options.map((option) => (
        <Button
          key={option.value}
          outline={currentValue === option.value}
          variant={currentValue === option.value ? 'primary' : 'secondary'}
          size="md"
          type="button"
          {...optionProps}
          onClick={(ev) => {
            onValueChange?.(option.value, option)
            optionProps?.onClick?.(ev)
          }}
        >
          {option.label}
        </Button>
      ))}
    </Grid>
  )
}

export const SelectorButton = React.forwardRef<React.ComponentRef<typeof Button>, ButtonProps>(
  ({ children, ...rest }, ref) => (
    <Button ref={ref} variant="secondary" size="sm" {...rest}>
      {children}
      <Icon.SelectorArrow />
    </Button>
  )
)
