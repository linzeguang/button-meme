import React, { useCallback, useEffect, useRef } from 'react'

import { Trans } from '@lingui/react/macro'
import { useAtom } from 'jotai/react'
import { Address } from 'viem'

import { TokenImage } from '@/assets/images'
import { Logo } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { MIT } from '@/constants/token'
import { defaultChartProps, getChartOverrides } from '@/constants/tradingiew'
import DataFeed from '@/lib/datafeed'
import { useTokenProviderContext } from '@/providers/TokenProvider'
import { themeAtom } from '@/stores/settings'
import { intervalAtom } from '@/stores/token'
import { ChartingLibraryWidgetOptions, IChartingLibraryWidget } from 'public/charting_library/charting_library'

const TvChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const widgetRef = useRef<IChartingLibraryWidget>()
  const datafeed = useRef(new DataFeed())

  const [theme] = useAtom(themeAtom)
  const [interval, setInterval] = useAtom(intervalAtom)
  const { tokenInfo } = useTokenProviderContext()

  const initChart = useCallback(() => {
    // if (!tokenInfo) return
    if (widgetRef.current) return

    let widget: IChartingLibraryWidget | undefined = undefined
    const script = document.createElement('script')
    script.src = '/charting_library/charting_library.standalone.js' // TradingView 库的路径
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      const widgetOptions: ChartingLibraryWidgetOptions = {
        // symbol: DataFeed.generateInitSymbol(tokenInfo.mintToken),
        symbol: DataFeed.generateInitSymbol({
          address: MIT.address as Address,
          name: MIT.name,
          symbol: MIT.symbol,
          decimals: MIT.decimals,
          burnedAmount: 0n
        }),
        interval,
        datafeed: datafeed.current,
        container: chartContainerRef.current!,
        ...getChartOverrides(theme),
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
  }, [interval, setInterval, theme])

  useEffect(() => {
    if (!widgetRef.current) {
      initChart()
    } else {
      const chart = widgetRef.current.activeChart()
      if (tokenInfo?.mintToken) chart.setSymbol(DataFeed.generateInitSymbol(tokenInfo.mintToken))
    }
  }, [initChart, tokenInfo?.mintToken])

  useEffect(() => {
    if (!widgetRef.current) return
    const widget = widgetRef.current
    widget.changeTheme(theme).finally(() => {
      widget.applyOverrides(getChartOverrides(theme).overrides!)
    })
  }, [theme])

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
                backgroundImage: `url(${TokenImage.ButtonBg})`
              }}
              className="h-[6.625rem] w-full bg-cover bg-center md:aspect-[885/127] md:h-auto"
            />
            <Flex className="h-10 w-full items-end gap-4 px-4">
              <Logo.Mit className="token-logo size-16 lg:size-24" />
              {/* <img src={TokenImage.Button} alt={tokenInfo?.mintToken.name} className="size-16 lg:size-24" /> */}
              {/* <Flex className="bg-background-secondary border-border light:bg-white size-16 items-center justify-center rounded-lg border lg:size-24">
                <Logo.Icon className="text-primary" />
              </Flex> */}
              <Flex className="flex-1 items-center justify-between py-1.5">
                <HarmonyOSSansText className="text-sm font-bold lg:text-lg">
                  {MIT.name}
                  {/* {tokenInfo?.mintToken.name || '--'} */}
                  {/* <HarmonyOSSansText as="span" className="text-xs font-normal lg:text-sm" variant="secondary">
                    / {tokenInfo?.mintToken.symbol || '--'}
                  </HarmonyOSSansText> */}
                </HarmonyOSSansText>
                <HarmonyOSSansText variant="secondary" className="text-sm font-bold lg:text-lg">
                  <Trans>EPoch: </Trans>
                  <HarmonyOSSansText as="span">{tokenInfo?.project.epoch ?? '--'}</HarmonyOSSansText>
                </HarmonyOSSansText>
              </Flex>
            </Flex>
          </>
        }
        content={<div ref={chartContainerRef} className="!h-90 overflow-hidden rounded-l-lg" />}
      />
    </AccordionRoot>
  )
}

export default TvChart
