import React, { useState } from 'react'

import { Icon, Socials } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { HarmonyOSSansText } from '@/components/ui/Text'

const TokenInfo: React.FC<{ className?: string; defaultValue?: string }> = (props) => {
  const [value, setValue] = useState(props.defaultValue ?? 'tokenInfo')

  const baseInfos = [
    {
      name: 'Contract',
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

  return (
    <AccordionRoot type="single" collapsible value={value} onValueChange={setValue} {...props}>
      <TokenAccordionItem
        value="tokenInfo"
        name={
          <>
            <HarmonyOSSansText>Token</HarmonyOSSansText>
            <Icon.Tip className="text-text-secondary" />
          </>
        }
        content={
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
        }
      />
    </AccordionRoot>
  )
}

export default TokenInfo
