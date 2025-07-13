import React, { useEffect } from 'react'

import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { HarmonyOSSansText } from '@/components/ui/Text'
// import DataFeed from '@/lib/datafeed'

const TvChart: React.FC = () => {
  // const datafeed = useRef(new DataFeed())

  useEffect(() => {
    return () => {
      //
    }
  }, [])

  return (
    <AccordionRoot type="single" collapsible value="tvchart">
      <TokenAccordionItem
        value="tvchart"
        triggerClassName="p-0 flex-col items-start"
        contentClassName="border-none"
        name={
          <>
            <Flex
              style={{
                backgroundImage: `url(${'https://dropsy.store/cdn/shop/collections/BANER_KATEGORIA_STRONA_5fd8394f-c7c1-4451-b5d5-8d5921817bb9.jpg?v=1747136972'})`
              }}
              className="h-24 w-full bg-cover bg-center lg:h-32"
            ></Flex>
            <Flex className="h-10 w-full items-end gap-4 px-4">
              <img
                src="https://image-cdn.solana.fm/images/?imageUrl=https://ipfs.io/ipfs/QmYPb4GHzW6cte3DSiaZCAAiJ2D6fRMitLpHisXgWwerzA"
                alt="labubu"
                className="size-16 lg:size-24"
              />
              <Flex className="flex-1 items-center justify-between py-1.5">
                <HarmonyOSSansText className="text-sm font-bold lg:text-lg">
                  name{' '}
                  <HarmonyOSSansText as="span" className="text-xs font-normal lg:text-sm" variant="secondary">
                    / symbol
                  </HarmonyOSSansText>
                </HarmonyOSSansText>
                <HarmonyOSSansText variant="secondary" className="text-sm font-bold lg:text-lg">
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
