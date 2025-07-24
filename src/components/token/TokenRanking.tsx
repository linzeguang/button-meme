import React, { useEffect, useState } from 'react'

import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'

import { Icon, TokenSvgr } from '@/components/svgr'
import { SearchHolder } from '@/components/token/Search'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { Table } from '@/components/ui/Table'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { Rank, useRank } from '@/hooks/services/useRank'
import useMediaQuery from '@/hooks/useMediaQuery'
import { formatAddress } from '@/lib/format'
import { cn } from '@/lib/utils'

const TokenRanking: React.FC = () => {
  const { isMobile } = useMediaQuery()
  const [value] = useState('tokenRanking')
  const [searchValue, setSearchValue] = useState('')

  const { data } = useRank()

  useEffect(() => {
    const index = searchValue ? data?.findIndex(({ account }) => account.includes(searchValue)) : -1
    let el: Element | null
    if (index === -1 && searchValue) {
      el = document.querySelector(`[data-index="out"]`)
      el?.classList.add('!text-primary')
    } else {
      el = document.querySelector(`[data-index="${index}"]`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    if (el) {
      el.classList.add('!text-primary')
      return () => {
        el.classList.remove('!text-primary')
      }
    }
  }, [data, searchValue])

  return (
    <AccordionRoot type="single" collapsible value={value}>
      <TokenAccordionItem
        value="tokenRanking"
        triggerClassName="py-0"
        name={
          <>
            <HarmonyOSSansText>
              <Trans>Ranking</Trans>
            </HarmonyOSSansText>{' '}
            <Flex className="items-center gap-1">
              <TokenSvgr.TokenInfo className="size-10.5" />
              <Icon.Tip className="text-text-secondary" />
            </Flex>
          </>
        }
        content={
          <div className="space-y-4">
            <SearchHolder value={searchValue} onChange={(ev) => setSearchValue(ev.target.value)} />
            <Table<Rank>
              className="border-separate border-spacing-y-0.5"
              columns={[
                {
                  name: null,
                  field: 'tsRankIndex',
                  width: '32px',
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
                  name: t`Address`,
                  field: 'account',
                  render: (address) => formatAddress(address, undefined, isMobile ? -2 : undefined)
                },
                {
                  name: t`TS`,
                  field: 'ts',
                  align: 'center'
                },
                {
                  name: t`Reward`,
                  field: 'tsReward',
                  align: 'end'
                }
              ]}
              dataSource={data || []}
              rowKey="account"
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
            <HarmonyOSSansText data-index="out" className="text-center text-[0.625rem]" variant="secondary">
              <Trans>- Out of TOP 100 -</Trans>
            </HarmonyOSSansText>
          </div>
        }
      />
    </AccordionRoot>
  )
}

export default TokenRanking
