import React, { useEffect, useRef } from 'react'

import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { HarmonyOSSansText } from '@/components/ui/Text'
import DataFeed from '@/lib/datafeed'
import { useTokenProviderContext } from '@/providers/TokenProvider'
import {
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  ResolutionString
} from 'public/charting_library/charting_library'

import { defaultChartProps, getChartOverrides } from '@/constants/tradingiew'

const TvChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const widgetRef = useRef<IChartingLibraryWidget>()
  const datafeed = useRef(new DataFeed())

  const { tokenAddress } = useTokenProviderContext()

  useEffect(() => {
    let widget: IChartingLibraryWidget | undefined = undefined
    const script = document.createElement('script')
    script.src = '/charting_library/charting_library.standalone.js' // TradingView 库的路径
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      const widgetOptions: ChartingLibraryWidgetOptions = {
        symbol: tokenAddress,
        interval: '1' as ResolutionString,
        datafeed: datafeed.current,
        container: chartContainerRef.current!,
        ...getChartOverrides(),
        ...defaultChartProps
      }
      widget = new window.TradingView.widget(widgetOptions)

      widget.onChartReady(() => {
        widgetRef.current = widget
        const chart = widget!.chart()
        chart.onIntervalChanged().subscribe(null, (interval) => {
          console.log('Interval changed to:', interval)
          setInterval(interval)
          datafeed.current.onResetCacheNeededCallback?.()
        })
      })
    }
  }, [tokenAddress])

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
        content={<div ref={chartContainerRef} className="!h-120" />}
      />
    </AccordionRoot>
  )
}

export default TvChart
