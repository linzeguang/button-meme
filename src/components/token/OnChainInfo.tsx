import React, { useState } from 'react'

import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'

import { TokenSvgr } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { useMemoWithLocale } from '@/hooks/useWithLocale'
import { fromRawAmount } from '@/lib/rawAmount'
import { cn } from '@/lib/utils'
import { useTokenProviderContext } from '@/providers/TokenProvider'

enum INFO_TYPE {
  Overview,
  UD
}

const OnChainInfo: React.FC = () => {
  const [value] = useState('onChainInfo')
  const [infoType, setInfoType] = useState<INFO_TYPE>(INFO_TYPE.Overview)

  const { tokenInfo, tokenUserInfo, userReward, reward } = useTokenProviderContext()

  const infoTypes = useMemoWithLocale<
    Record<
      INFO_TYPE,
      {
        name: string
        value: INFO_TYPE
        infos: Array<
          {
            name: string
            value: string | number
            highlight?: boolean
          }[]
        >
      }
    >
  >(
    () => ({
      [INFO_TYPE.Overview]: {
        name: t`Overview`,
        value: INFO_TYPE.Overview,
        infos: [
          [
            {
              name: t`Total LPH`,
              value: tokenInfo ? fromRawAmount(tokenInfo.totalLPH, 2) : '--'
            },
            {
              name: t`Total TH`,
              value: reward?.totalTH ?? '--'
            },
            {
              name: t`Total TS`,
              value: reward?.totalTS ?? '--'
            },
            {
              name: t`Burned`,
              value: tokenInfo
                ? fromRawAmount(tokenInfo.mintToken.burnedAmount || 0n, tokenInfo.mintToken.decimals)
                : '--'
            }
          ]
        ]
      },
      [INFO_TYPE.UD]: {
        name: t`矿主数据`,
        value: INFO_TYPE.UD,
        infos: [
          [
            {
              name: t`矿场数量`,
              value: tokenUserInfo?.lph.toString() ?? '--'
            },
            {
              name: t`贡献值`,
              value: userReward?.th ?? '--'
            },
            {
              name: t`热力值排名`,
              value: userReward?.tsRankIndex ?? '--',
              highlight: true
            },
            {
              name: t`热力值`,
              value: userReward?.ts ?? '--',
              highlight: true
            }
          ]
        ]
      }
    }),
    [reward, tokenInfo, tokenUserInfo, userReward]
  )

  const infos = useMemoWithLocale(() => infoTypes[infoType].infos, [infoType, infoTypes])

  return (
    <AccordionRoot type="single" collapsible value={value}>
      <TokenAccordionItem
        value="onChainInfo"
        triggerClassName="pt-0 pb-2"
        name={
          <>
            <Flex className="gap-0.5">
              {Object.values(infoTypes).map((type) => (
                <div
                  key={type.value}
                  className={cn(
                    'cursor-pointer px-4 py-2.5 transition-all',
                    'border-background-unactive border-b-2',
                    infoType === type.value && 'text-primary border-primary'
                  )}
                  onClick={() => setInfoType(type.value)}
                >
                  {type.name}
                </div>
              ))}
            </Flex>
            <TokenSvgr.OnChainInfo className="size-10.5" />
          </>
        }
        contentClassName="border-none pt-0"
        content={
          <div>
            {infoType === INFO_TYPE.Overview && (
              <Flex className="h-14 items-center">
                <HarmonyOSSansText className="text-xl font-bold">
                  <Trans>EPoch: </Trans>
                  {tokenInfo?.project.epoch ?? '--'}
                </HarmonyOSSansText>
              </Flex>
            )}
            {infos.map((_infos, index) => (
              <ul key={index} className="border-border mb-1 border-b pb-1 last:mb-0 last:border-b-0 last:pb-0">
                {_infos.map(({ name, value, highlight }, i) => (
                  <li
                    key={`${index}-${i}`}
                    className="border-border flex h-7 items-center justify-between border-b border-dashed text-sm last:border-b-0"
                  >
                    <HarmonyOSSansText as="span" variant="secondary">
                      {name}
                    </HarmonyOSSansText>
                    <HarmonyOSSansText as="span" variant={highlight ? 'primary' : 'default'}>
                      {value}
                    </HarmonyOSSansText>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        }
      />
    </AccordionRoot>
  )
}

export default OnChainInfo
