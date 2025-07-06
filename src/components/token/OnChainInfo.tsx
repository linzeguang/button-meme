import React, { useMemo, useState } from 'react'

import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { cn } from '@/lib/utils'

enum INFO_TYPE {
  Overview,
  UD
}

const OnChainInfo: React.FC = () => {
  const [value] = useState('onChainInfo')
  const [infoType, setInfoType] = useState<INFO_TYPE>(INFO_TYPE.Overview)

  const infoTypes = useMemo<
    Record<
      INFO_TYPE,
      {
        name: string
        value: INFO_TYPE
        infos: Array<
          {
            name: string
            value: string
            highlight?: boolean
          }[]
        >
      }
    >
  >(
    () => ({
      [INFO_TYPE.Overview]: {
        name: 'Overview',
        value: INFO_TYPE.Overview,
        infos: [
          [
            {
              name: 'Total LPH',
              value: '--'
            },
            {
              name: 'Total TH',
              value: '--'
            },
            {
              name: 'Total TS',
              value: '--'
            },
            {
              name: 'Burned',
              value: '--'
            }
          ]
        ]
      },
      [INFO_TYPE.UD]: {
        name: 'UD',
        value: INFO_TYPE.UD,
        infos: [
          [
            {
              name: 'My TH',
              value: '--'
            },
            {
              name: 'My direct referrals',
              value: '--'
            },
            {
              name: 'My harvested TH rewards',
              value: '--',
              highlight: true
            },
            {
              name: 'My harvestable TH rewards',
              value: '--',
              highlight: true
            }
          ],
          [
            {
              name: 'My TS Rank',
              value: '--'
            },
            {
              name: 'My indirect referrals',
              value: '--'
            },
            {
              name: 'MY TS',
              value: '--'
            },
            {
              name: 'My harvested TS rewards',
              value: '--',
              highlight: true
            },
            {
              name: 'My harvestable TS rewards',
              value: '--',
              highlight: true
            }
          ]
        ]
      }
    }),
    []
  )

  const infos = useMemo(() => infoTypes[infoType].infos, [infoType, infoTypes])

  return (
    <AccordionRoot type="single" collapsible value={value}>
      <TokenAccordionItem
        value="onChainInfo"
        triggerClassName="pt-0 pb-2"
        name={
          <Flex className="gap-0.5">
            {Object.values(infoTypes).map((type) => (
              <div
                key={type.value}
                className={cn(
                  'relative cursor-pointer px-4 py-2.5 transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full',
                  infoType === type.value && 'text-primary after:bg-primary'
                )}
                onClick={() => setInfoType(type.value)}
              >
                {type.name}
              </div>
            ))}
          </Flex>
        }
        contentClassName="border-none pt-0"
        content={
          <div>
            {infoType === INFO_TYPE.Overview && (
              <Flex className="h-14 items-center">
                <HarmonyOSSansText className="text-xl font-bold">EPoch：1</HarmonyOSSansText>
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
