import React, { type ButtonHTMLAttributes } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { Icon } from '@/components/svgr'
import { Grid } from '@/components/ui/Box'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  cn(
    'flex items-center justify-center space-x-2 px-2 border rounded-sm',
    'transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-80 disabled:backdrop-blur-2xl'
  ),
  {
    variants: {
      variant: {
        primary: 'bg-primary border-primary text-primary-foreground',
        secondary: 'bg-background-secondary',
        fourth: 'bg-background-fourth text-text-secondary border-background-fourth'
      },
      size: {
        xxs: 'h-6 text-xs space-x-1',
        xs: 'h-7 text-sm space-x-1',
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-base'
      },
      ghost: {
        true: 'bg-transparent border-none'
      },
      outline: {
        true: 'bg-transparent aaaa'
      }
    },
    compoundVariants: [
      {
        outline: true,
        variant: 'fourth',
        className: 'text-background-fourth'
      }
    ],
    defaultVariants: {
      size: 'md'
    }
  }
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, className, ghost, outline, size, variant, loading, ...rest } = props
  return (
    <button ref={ref} className={cn(buttonVariants({ ghost, outline, size, variant, className }))} {...rest}>
      {loading && <Icon.Loading className="loading size-4" />}
      {typeof children === 'string' ? <span>{children}</span> : children}
    </button>
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
  // value: currentValue,
  onValueChange,
  ...rest
}: ButtonRadioProps<D>) => {
  return (
    <Grid {...rest}>
      {options.map((option) => (
        <Button
          key={option.value}
          // outline={currentValue === option.value}
          // variant={currentValue === option.value ? 'primary' : 'secondary'}
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
      {/* <Icon.SelectorArrow /> */}
    </Button>
  )
)
