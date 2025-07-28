import React from 'react'

import Invite from '@/components/token/Invite'
import OnChainInfo from '@/components/token/OnChainInfo'
import Reward from '@/components/token/Reward'
// import { SearchToken } from '@/components/token/Search'
import TokenInfo from '@/components/token/TokenInfo'
// import Tokenomic from '@/components/token/Tokenomic'
import TokenRanking from '@/components/token/TokenRanking'
import TokenRecord from '@/components/token/TokenRecord'
import { Trade } from '@/components/token/Trade'
import TvChart from '@/components/token/TvChart'
import { Flex } from '@/components/ui/Box'
import useMediaQuery from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import TokenProvider from '@/providers/TokenProvider'

const Token: React.FC = () => {
  const { gt2XL, gtLG } = useMediaQuery()

  return (
    <TokenProvider>
      {gt2XL ? (
        <Flex className={cn('gap-6 pt-10 [&>div]:gap-6')}>
          <Flex className="relative w-[24%] max-w-108 flex-col">
            {/* <SearchToken wrapperClassName="absolute w-full -top-6 -translate-y-full" /> */}
            <TokenInfo />
            {/* <Tokenomic /> */}
            <TokenRanking />
            <Invite />
          </Flex>
          <Flex className="flex-1 flex-col">
            <TvChart />
            <TokenRecord />
          </Flex>
          <Flex className="w-[30%] max-w-108 flex-col">
            <OnChainInfo />
            <Reward />
            <Trade />
          </Flex>
        </Flex>
      ) : gtLG ? (
        <Flex className={cn('gap-4 pt-10 [&>div]:gap-4')}>
          <Flex className="relative flex-1 flex-col">
            {/* <SearchToken wrapperClassName="absolute w-full -top-4 -translate-y-full w-108" /> */}
            <TvChart />
            <TokenRecord />
            <TokenRanking />
          </Flex>
          <Flex className="w-[30%] max-w-108 flex-col">
            <OnChainInfo />
            <Reward />
            <Trade />
            <TokenInfo />
            {/* <Tokenomic /> */}
            <Invite />
          </Flex>
        </Flex>
      ) : (
        <Flex className={cn('flex-col gap-4 pt-0')}>
          {/* <SearchToken wrapperClassName="w-full" /> */}
          <TokenInfo className="flex-1" defaultValue="" />
          {/* <Tokenomic className="flex-1" defaultValue="" /> */}
          <TvChart />
          <OnChainInfo />
          <Reward />
          <TokenRecord />
          <TokenRanking />
          <Invite />
        </Flex>
      )}
    </TokenProvider>
  )
}

export default Token
