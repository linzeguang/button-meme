import { Box } from '@/components/ui/Box'
import { cn } from '@/lib/utils'

const commonClassName = 'fixed  z-[-1] size-[1000px] rounded-b-full b blur-[356px]'

export const RightBottomCircle = () => {
  return <Box className={cn(commonClassName, '-bottom-1/5 -left-[300px] bg-[#D5FFF7]/20')} />
}

export const LeftTopCircle = () => {
  return <Box className={cn(commonClassName, '-right-[500px] -top-[500px] bg-primary/20')} />
}
