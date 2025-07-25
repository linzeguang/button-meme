import React, { useMemo, useState } from 'react'

import { t } from '@lingui/core/macro'

import { TokenSvgr } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { Table } from '@/components/ui/Table'
import { formatNumber } from '@/lib/format'
import { cn } from '@/lib/utils'
import { useTokenProviderContext } from '@/providers/TokenProvider'

enum RECORD_TYPE {
  Trade,
  Active
}

enum TRADE_TYPE {
  Buy,
  Sell
}

type TradeData = {
  date: string
  type: TRADE_TYPE
  base: string
  baseAmount: string
  quote: string
  quoteAmount: string
  price: string
  tx: string
}

const TokenRecord: React.FC = () => {
  const [value] = useState('record')
  const [recordType, setRecordType] = useState<RECORD_TYPE>(RECORD_TYPE.Trade)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { tokenInfo } = useTokenProviderContext()

  const recordTypes = useMemo(
    () => [
      {
        name: t`Transaction History`,
        value: RECORD_TYPE.Trade
      },
      {
        name: t`Activity Log`,
        value: RECORD_TYPE.Active
      }
    ],
    []
  )

  const dataSource: TradeData[] = Array.from({ length: 0 }, () => ({
    base: 'LABUBU',
    baseAmount: formatNumber(Math.random() * 1_000_000_000),
    date: '2025-12-12',
    price: formatNumber(Math.random() * 1_000),
    quote: 'ETH',
    quoteAmount: formatNumber(Math.random() * 1_000_000),
    tx: '0x*********',
    type: Math.random() > 0.5 ? TRADE_TYPE.Buy : TRADE_TYPE.Sell
  }))

  return (
    <AccordionRoot type="single" collapsible value={value}>
      <TokenAccordionItem
        value="record"
        triggerClassName="pt-0"
        name={
          <>
            <Flex className="gap-0.5">
              {recordTypes.map((type) => (
                <div
                  key={type.value}
                  className={cn(
                    'relative cursor-pointer px-4 py-2.5 transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full',
                    recordType === type.value && 'text-primary after:bg-primary'
                  )}
                  onClick={() => setRecordType(type.value)}
                >
                  {type.name}
                </div>
              ))}
            </Flex>
            <TokenSvgr.TokenRecord className="size-10.5" />
          </>
        }
        contentClassName="pt-0 border-none"
        content={
          <Table<TradeData>
            columns={[
              {
                name: t`Date`,
                field: 'date'
              },
              {
                name: t`Type`,
                field: 'type',
                render: (value) => {
                  const isBuy = value === TRADE_TYPE.Buy
                  return <span className={isBuy ? 'text-success' : 'text-destructive'}>{isBuy ? 'Buy' : 'Sell'}</span>
                }
              },
              {
                name: tokenInfo?.mintToken.symbol,
                field: 'baseAmount',
                render: (value, data) => {
                  const isBuy = data.type === TRADE_TYPE.Buy
                  return <span className={isBuy ? 'text-success' : 'text-destructive'}>{value}</span>
                }
              },
              {
                name: tokenInfo?.stableToken.symbol,
                field: 'quoteAmount',
                render: (value, data) => {
                  const isBuy = data.type === TRADE_TYPE.Buy
                  return <span className={isBuy ? 'text-success' : 'text-destructive'}>{value}</span>
                }
              },
              {
                name: t`Price`,
                field: 'price',
                render: (value, data) => {
                  const isBuy = data.type === TRADE_TYPE.Buy
                  return <span className={isBuy ? 'text-success' : 'text-destructive'}>{value}</span>
                }
              },
              {
                name: t`View`,
                field: 'tx',
                render: (value) => <span className="text-primary">{value}</span>
              }
            ]}
            dataSource={dataSource}
            pagination={{
              page,
              pageSize,
              total: dataSource.length,
              onChange: ({ page, pageSize }) => {
                setPage(page)
                setPageSize(pageSize)
              }
            }}
          />
        }
      />
    </AccordionRoot>
  )
}

export default TokenRecord
