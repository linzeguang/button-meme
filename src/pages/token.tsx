import React from 'react'

import OnChainInfo from '@/components/token/OnChainInfo'
import Reward from '@/components/token/Reward'
import { SearchToken } from '@/components/token/Search'
import TokenInfo from '@/components/token/TokenInfo'
import Tokenomic from '@/components/token/Tokenomic'
import TokenRanking from '@/components/token/TokenRanking'
import TokenRecord from '@/components/token/TokenRecord'
import TvChart from '@/components/token/TvChart'
import { Flex } from '@/components/ui/Box'
import Card from '@/components/ui/Card'
import useMediaQuery from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

const Token: React.FC = () => {
  const { gt2XL, gtLG } = useMediaQuery()
  if (gt2XL)
    return (
      <Flex className={cn('gap-6 pt-10 [&>div]:gap-6')}>
        <Flex className="relative w-[24%] max-w-108 flex-col">
          <SearchToken wrapperClassName="absolute w-full -top-6 -translate-y-full" />
          <TokenInfo />
          <Tokenomic />
          <TokenRanking />
        </Flex>
        <Flex className="flex-1 flex-col">
          <TvChart />
          <TokenRecord />
        </Flex>
        <Flex className="w-[30%] max-w-108 flex-col">
          <OnChainInfo />
          <Card className="h-[288px]">mint</Card>
          <Card className="h-[348px]">trade</Card>
        </Flex>
      </Flex>
    )

  if (gtLG)
    return (
      <Flex className={cn('gap-4 pt-10 [&>div]:gap-4')}>
        <Flex className="relative flex-1 flex-col">
          <SearchToken wrapperClassName="absolute w-full -top-6 -translate-y-full w-108" />
          <TvChart />
          <TokenRecord />
        </Flex>
        <Flex className="w-[30%] max-w-108 flex-col">
          <OnChainInfo />
          <Reward />
          {/* <Card className="h-[288px]">mint</Card>
          <Card className="h-[348px]">trade</Card> */}
          <TokenInfo defaultValue="" />
          <Tokenomic defaultValue="" />
          <TokenRanking />
        </Flex>
      </Flex>
    )

  return (
    <Flex className={cn('flex-col gap-4 pt-0')}>
      <SearchToken wrapperClassName="w-full" />
      <TokenInfo className="flex-1" defaultValue="" />
      <Tokenomic className="flex-1" defaultValue="" />
      <TvChart />
      <TokenRecord />
    </Flex>
  )
}

export default Token
