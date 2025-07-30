import React, { useMemo } from 'react'

import { Icon } from '@/components/svgr'
import { Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export interface PaginationProps {
  pageSize: number
  page: number
  total: number
  onChange?: (data: { pageSize: number; page: number }) => void
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { page, pageSize, total, onChange } = props

  const { isFirst, isLast, pageNums } = useMemo(() => {
    const pageNums = Math.floor(total / pageSize)
    return {
      isFirst: page === 1,
      isLast: page === pageNums,
      pageNums: Array.from({ length: pageNums }, (_, i) => i + 1)
    }
  }, [page, pageSize, total])

  return (
    <Flex className="[&_button]:size-5.5 [&_button]:!rounded-xs justify-center space-x-1.5 [&_button]:!p-0">
      <Button
        key="prev"
        variant="fourth"
        size="xs"
        outline={isFirst}
        className={isFirst ? 'cursor-not-allowed' : ''}
        onClick={() => {
          if (isFirst) return
          if (!onChange) return
          onChange({
            page: page - 1,
            pageSize
          })
        }}
      >
        <Icon.Prev />
      </Button>
      {pageNums.map((pageNum) => (
        <Button
          key={pageNum}
          variant="fourth"
          size="xs"
          className={cn('font-HarmonyOSSans text-xs font-bold leading-none', pageNum === page && 'text-primary')}
          onClick={() => {
            if (!onChange) return
            onChange({
              page: pageNum,
              pageSize
            })
          }}
        >
          {pageNum}
        </Button>
      ))}
      <Button
        key="next"
        variant="fourth"
        size="xs"
        outline={isLast}
        className={isLast ? 'cursor-not-allowed' : ''}
        onClick={() => {
          if (isLast) return
          if (!onChange) return
          onChange({
            page: page + 1,
            pageSize
          })
        }}
      >
        <Icon.Next />
      </Button>
    </Flex>
  )
}
