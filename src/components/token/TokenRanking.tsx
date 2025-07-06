import React, { useState } from 'react'

import { Icon } from '@/components/svgr'
import { SearchHolder } from '@/components/token/Search'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Table } from '@/components/ui/Table'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { formatNumber } from '@/lib/format'
import { cn } from '@/lib/utils'

type HolderData = {
  id: string
  address: string
  amount: string
  reward: string
}

const TokenRanking: React.FC = () => {
  const [value] = useState('tokenRanking')
  const dataSource: HolderData[] = Array.from({ length: 100 }, (_, index) => ({
    id: index.toString(),
    address: '0x***********',
    amount: formatNumber(Math.random() * 1_000_000_000),
    reward: formatNumber(Math.random() * 1_000_000)
  }))

  return (
    <AccordionRoot type="single" collapsible value={value}>
      <TokenAccordionItem
        value="tokenRanking"
        name={
          <>
            <HarmonyOSSansText>Hash Ranking</HarmonyOSSansText>
            <Icon.Tip className="text-text-secondary" />
          </>
        }
        content={
          <div className="space-y-4">
            <SearchHolder />
            <Table<HolderData>
              className="border-separate border-spacing-y-0.5"
              columns={[
                {
                  name: null,
                  field: 'id',
                  width: '22px',
                  render: (_, __, index) => {
                    return index === 0 ? (
                      <Icon.Top1 />
                    ) : index === 1 ? (
                      <Icon.Top2 />
                    ) : index === 2 ? (
                      <Icon.Top3 />
                    ) : (
                      <HarmonyOSSansText variant="tertiary" className="text-center">
                        {index + 1}
                      </HarmonyOSSansText>
                    )
                  }
                },
                {
                  name: 'Address',
                  field: 'address'
                },
                {
                  name: 'TS',
                  field: 'amount',
                  align: 'center'
                },
                {
                  name: 'Reward',
                  field: 'reward',
                  align: 'end'
                }
              ]}
              dataSource={dataSource}
              rowKey={(_, index) => index.toString()}
              thProps={{
                className: 'text-text-secondary'
              }}
              tbodyTrProps={{
                className: cn(
                  'bg-linear-to-r hover:!text-primary text-text-secondary',
                  'data-[index=1]:from-top-1/10 data-[index=1]:to-transparent data-[index=1]:text-text-primary',
                  'data-[index=2]:from-top-2/10 data-[index=2]:to-transparent data-[index=2]:text-text-primary',
                  'data-[index=3]:from-top-3/10 data-[index=3]:to-transparent data-[index=3]:text-text-primary'
                )
              }}
              tdProps={{
                className: 'text-xs'
              }}
              scroll={{ y: 320 }}
            />
            <HarmonyOSSansText className="text-center text-[0.625rem]" variant="secondary">
              - Out of TOP 100 -
            </HarmonyOSSansText>
          </div>
        }
      />
    </AccordionRoot>
  )
}

export default TokenRanking
