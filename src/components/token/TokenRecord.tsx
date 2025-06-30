import React, { useMemo, useState } from 'react'

import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Table } from '@/components/ui/Table'
import { cn } from '@/lib/utils'

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

  const recordTypes = useMemo(
    () => [
      {
        name: '交易记录',
        value: RECORD_TYPE.Trade
      },
      {
        name: '活动记录',
        value: RECORD_TYPE.Active
      }
    ],
    []
  )

  const dataSource: TradeData[] = Array.from({ length: 100 }, () => ({
    base: 'LABUBU',
    baseAmount: (Math.random() * 1_000_000_000).toString(),
    date: '2025-12-12',
    price: (Math.random() * 1_000).toString(),
    quote: 'ETH',
    quoteAmount: (Math.random() * 1_000_000).toString(),
    tx: '0x*********',
    type: Math.random() > 0.5 ? TRADE_TYPE.Buy : TRADE_TYPE.Sell
  }))

  return (
    <AccordionRoot type="single" collapsible value={value}>
      <TokenAccordionItem
        value="record"
        name={
          <Flex className="gap-0.5">
            {recordTypes.map((type) => (
              <Button
                key={type.value}
                ghost
                className={cn(
                  'relative px-4 transition-all after:absolute after:bottom-0 after:h-0.5 after:w-full',
                  recordType === type.value && 'text-primary after:bg-primary'
                )}
                onClick={() => setRecordType(type.value)}
              >
                {type.name}
              </Button>
            ))}
          </Flex>
        }
        content={
          <Table<TradeData>
            columns={[
              {
                name: 'Date',
                field: 'date'
              },
              {
                name: 'Type',
                field: 'type',
                render: (value) => {
                  const isBuy = value === TRADE_TYPE.Buy
                  return <span className={isBuy ? 'text-success' : 'text-destructive'}>{isBuy ? 'Buy' : 'Sell'}</span>
                }
              },
              {
                name: 'LBB',
                field: 'baseAmount',
                render: (value, data) => {
                  const isBuy = data.type === TRADE_TYPE.Buy
                  return <span className={isBuy ? 'text-success' : 'text-destructive'}>{value}</span>
                }
              },
              {
                name: 'ETH',
                field: 'quoteAmount',
                render: (value, data) => {
                  const isBuy = data.type === TRADE_TYPE.Buy
                  return <span className={isBuy ? 'text-success' : 'text-destructive'}>{value}</span>
                }
              },
              {
                name: 'Price',
                field: 'price',
                render: (value, data) => {
                  const isBuy = data.type === TRADE_TYPE.Buy
                  return <span className={isBuy ? 'text-success' : 'text-destructive'}>{value}</span>
                }
              },
              {
                name: 'View',
                field: 'tx',
                align: 'end',
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
        contentClassName="border-none"
      />
    </AccordionRoot>
  )
}

export default TokenRecord
