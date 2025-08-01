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

const Token: React.FC = () => {
  const { gt2XL, gtLG } = useMediaQuery()

  return (
    <>
      {gt2XL ? (
        <Flex className={cn('space-x-6 [&>div]:space-y-6')}>
          <Flex className="max-w-108 relative w-[24%] flex-col">
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
          <Flex className="max-w-108 w-[30%] flex-col">
            <OnChainInfo />
            <Reward />
            <Trade />
          </Flex>
        </Flex>
      ) : gtLG ? (
        <Flex className={cn('space-x-4 [&>div]:space-y-4')}>
          <Flex className="relative flex-1 flex-col">
            {/* <SearchToken wrapperClassName="absolute w-full -top-4 -translate-y-full w-108" /> */}
            <TvChart />
            <TokenRecord />
            <TokenRanking />
          </Flex>
          <Flex className="max-w-108 w-[30%] flex-col">
            <OnChainInfo />
            <Reward />
            <Trade />
            <TokenInfo />
            {/* <Tokenomic /> */}
            <Invite />
          </Flex>
        </Flex>
      ) : (
        <Flex className={cn('flex-col space-y-4')}>
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
    </>
  )
}

export default Token
