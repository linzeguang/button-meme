import React from 'react'

import SearchToken from '@/components/token/SearchToken'
import TokenInfo from '@/components/token/TokenInfo'
import { Flex } from '@/components/ui/Box'
import Card from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const Token: React.FC = () => {
  return (
    <Flex className={cn('gap-6 pt-10 [&>div]:gap-6')}>
      <Flex className="relative w-[24%] max-w-108 flex-col">
        <SearchToken wrapperClassName="absolute w-full -top-6 -translate-y-full" />
        <TokenInfo />
      </Flex>
      <Flex className="flex-1 flex-col">
        <Card className="h-[532px]">Tv charts</Card>
        <Card className="h-[560px]">order book</Card>
      </Flex>
      <Flex className="w-[30%] max-w-108 flex-col">
        <Card className="h-[288px]">mint</Card>
        <Card className="h-[348px]">trade</Card>
        <Card className="h-[462px]">holder</Card>
      </Flex>
    </Flex>
  )
}

export default Token
