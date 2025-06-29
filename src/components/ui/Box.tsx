import React, { type ComponentPropsWithoutRef, type ComponentRef, type HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export const Box = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => (
  <div ref={ref} {...props} />
))

export const Flex = React.forwardRef<ComponentRef<typeof Box>, ComponentPropsWithoutRef<typeof Box>>((props, ref) => (
  <Box ref={ref} {...props} className={cn('flex', props.className)} />
))

export const Grid = React.forwardRef<ComponentRef<typeof Box>, ComponentPropsWithoutRef<typeof Box>>((props, ref) => (
  <Box ref={ref} {...props} className={cn('grid', props.className)} />
))

export const Container = React.forwardRef<ComponentRef<typeof Box>, ComponentPropsWithoutRef<typeof Box>>(
  (props, ref) => <Box ref={ref} {...props} className={cn('px-6', props.className)} />
)
