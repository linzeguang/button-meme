import React, { useState } from 'react'

import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'

import { Icon, Socials, TokenSvgr } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { useMemoWithLocale } from '@/hooks/useWithLocale'
import { formatAddress } from '@/lib/format'
import { copy } from '@/lib/utils'
import { useTokenProviderContext } from '@/providers/TokenProvider'

const TokenInfo: React.FC<{ className?: string; defaultValue?: string }> = (props) => {
  const [value, setValue] = useState(props.defaultValue ?? 'tokenInfo')
  const { tokenInfo } = useTokenProviderContext()

  const baseInfos = useMemoWithLocale(
    () => [
      {
        name: t`Contract`,
        value: (
          <HarmonyOSSansText className="text-primary flex items-center gap-1">
            <span>{tokenInfo ? formatAddress(tokenInfo.mintToken.address) : '--'}</span>
            <Icon.Copy className="cursor-pointer" onClick={() => copy(tokenInfo!.mintToken.address)} />
          </HarmonyOSSansText>
        )
      },
      {
        name: t`Name`,
        value: tokenInfo ? tokenInfo.mintToken.name : '--'
      },
      {
        name: t`Symbol`,
        value: tokenInfo ? tokenInfo.mintToken.symbol : '--'
      }
    ],
    [tokenInfo]
  )

  return (
    <AccordionRoot type="single" collapsible value={value} onValueChange={setValue} {...props}>
      <TokenAccordionItem
        value="tokenInfo"
        triggerClassName="py-0"
        name={
          <>
            <HarmonyOSSansText>
              <Trans>Token</Trans>
            </HarmonyOSSansText>
            <Flex className="items-center gap-1">
              <TokenSvgr.TokenInfo className="size-10.5" />
              <Icon.Tip className="text-text-secondary" />
            </Flex>
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
