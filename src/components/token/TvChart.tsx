import React, { useEffect, useState } from 'react'

import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { HarmonyOSSansText } from '@/components/ui/Text'

const TvChart: React.FC = () => {
  const [value] = useState('tvchart')

  useEffect(() => {
    return () => {
      //
    }
  }, [])

  return (
    <AccordionRoot type="single" collapsible value={value}>
      <TokenAccordionItem
        value="tvchart"
        triggerClassName="p-0 flex-col items-start"
        contentClassName="border-none"
        name={
          <>
            <Flex className="h-32 items-center justify-center overflow-hidden">
              <img
                className="object-cover"
                src="https://dropsy.store/cdn/shop/collections/BANER_KATEGORIA_STRONA_5fd8394f-c7c1-4451-b5d5-8d5921817bb9.jpg?v=1747136972"
                alt="labubu"
              />
            </Flex>
            <Flex className="h-10 w-full items-end gap-4 px-4">
              <img
                src="https://image-cdn.solana.fm/images/?imageUrl=https://ipfs.io/ipfs/QmYPb4GHzW6cte3DSiaZCAAiJ2D6fRMitLpHisXgWwerzA"
                alt="labubu"
                className="size-24"
              />
              <Flex className="flex-1 items-center justify-between py-1.5">
                <HarmonyOSSansText className="text-lg font-bold">
                  Token symbol{' '}
                  <HarmonyOSSansText as="span" className="text-sm font-normal" variant="secondary">
                    / Token symbol
                  </HarmonyOSSansText>
                </HarmonyOSSansText>
                <HarmonyOSSansText variant="secondary" className="text-lg font-bold">
                  EPoch: <HarmonyOSSansText as="span">1</HarmonyOSSansText>
                </HarmonyOSSansText>
              </Flex>
            </Flex>
          </>
        }
        content={<div id="chart" className="!h-78" />}
      />
    </AccordionRoot>
  )
}

export default TvChart
