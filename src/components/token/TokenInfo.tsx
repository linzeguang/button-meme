import React from 'react'

import { ResponsivePie } from '@nivo/pie'

import { Icon, Socials } from '@/components/svgr'
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { HarmonyOSSansText } from '@/components/ui/Text'

const data = [
  {
    id: 'presalc',
    label: 'Presalc',
    value: 40
  },
  {
    id: 'liquidity',
    label: 'Liquidity',
    value: 30
  },
  {
    id: 'burnt',
    label: 'Burnt',
    value: 20
  }
]

const TokenInfo: React.FC = () => {
  const baseInfos = [
    {
      name: 'Contract Address',
      value: (
        <HarmonyOSSansText className="text-primary flex items-center gap-1">
          <span>0x****...****</span>
          <Icon.Copy />
        </HarmonyOSSansText>
      )
    },
    {
      name: 'Name',
      value: 'LABUBU'
    },
    {
      name: 'Symbol',
      value: 'LBB'
    }
  ]
  const accordionOptions = [
    {
      value: 'tokenInfo',
      name: (
        <>
          <HarmonyOSSansText>Token</HarmonyOSSansText>
          <Icon.Tip className="text-text-secondary" />
        </>
      ),
      content: (
        <>
          <Flex className="gap-4">
            {[Socials.Facebook, Socials.Twitter, Socials.YouTube, Socials.WhatsApp, Socials.Telegram].map(
              (SocialsIcon, index) => (
                <SocialsIcon key={index} className="text-primary size-4.5" />
              )
            )}
          </Flex>
          <HarmonyOSSansText className="text-sm">
            No description No descriptionNo descriptionNo descriptionNo descriptionNo descriptionNo descriptionNo
            descriptionNo descriptionNo descriptionNo description
          </HarmonyOSSansText>
          <ul>
            {baseInfos.map((info, index) => (
              <li
                key={index}
                className="border-border flex items-center justify-between border-b border-dashed py-2 text-sm last:border-none"
              >
                <HarmonyOSSansText>{info.name}</HarmonyOSSansText>
                {typeof info.value === 'object' ? info.value : <HarmonyOSSansText>{info.value}</HarmonyOSSansText>}
              </li>
            ))}
          </ul>
        </>
      )
    },
    {
      value: 'tokenomic',
      name: (
        <>
          <HarmonyOSSansText>Tokenomic</HarmonyOSSansText>
          <Icon.Tip className="text-text-secondary" />
        </>
      ),
      content: (
        <>
          <div className="mx-auto aspect-square w-4/5 max-w-64">
            <ResponsivePie /* or Pie for fixed dimensions */
              data={data}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              // innerRadius={0.7}
              // padAngle={0.6}
              enableArcLabels={false}
              enableArcLinkLabels={false}
              isInteractive={false}
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  translateY: 20,
                  itemWidth: 56,
                  itemHeight: 10,
                  itemsSpacing: 12,
                  symbolSize: 10,
                  itemTextColor: '#fff'
                }
              ]}
            />
          </div>
        </>
      )
    }
  ]

  return (
    <AccordionRoot type="multiple" className="space-y-6" value={['tokenInfo', 'tokenomic']}>
      {accordionOptions.map((option) => (
        <AccordionItem key={option.value} value={option.value} className="card p-0">
          <AccordionTrigger showArrow={false} className="items-center justify-between p-4">
            {option.name}
          </AccordionTrigger>
          <AccordionContent className="border-border space-y-2 border-t border-dashed p-4">
            {option.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  )
}

export default TokenInfo
