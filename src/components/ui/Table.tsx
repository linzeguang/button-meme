import React, { useId, useMemo, type CSSProperties } from 'react'

import { Pagination } from '@/components/ui/Pagination'
import { cn } from '@/lib/utils'

export const TableRoot = React.forwardRef<React.ElementRef<'table'>, React.TableHTMLAttributes<HTMLTableElement>>(
  (props, ref) => <table ref={ref} {...props} className={cn('w-full table-fixed', props.className)} />
)
export const TableCaption = React.forwardRef<
  React.ElementRef<'caption'>,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => <caption ref={ref} {...props} className={cn('', props.className)} />)
export const TableHead = React.forwardRef<React.ElementRef<'thead'>, React.HTMLAttributes<HTMLTableSectionElement>>(
  (props, ref) => <thead ref={ref} {...props} className={cn('bg-background-fourth', props.className)} />
)
export const TableBody = React.forwardRef<React.ElementRef<'tbody'>, React.HTMLAttributes<HTMLTableSectionElement>>(
  (props, ref) => <tbody ref={ref} {...props} className={cn('', props.className)} />
)
export const TableRow = React.forwardRef<React.ElementRef<'tr'>, React.HTMLAttributes<HTMLTableRowElement>>(
  (props, ref) => <tr ref={ref} {...props} className={cn('', props.className)} />
)
export const TableHeadCell = React.forwardRef<React.ElementRef<'th'>, React.HTMLAttributes<HTMLTableCellElement>>(
  (props, ref) => <th ref={ref} {...props} className={cn('text-text-primary p-2 font-normal', props.className)} />
)
export const TableDateCell = React.forwardRef<React.ElementRef<'td'>, React.HTMLAttributes<HTMLTableCellElement>>(
  (props, ref) => <td ref={ref} {...props} className={cn('px-2 py-2.5', props.className)} />
)

export const Table = <D extends object>(props: TableProps<D>) => {
  const {
    columns,
    dataSource,
    // loading,
    rowKey = 'id' as keyof D,
    theadProps,
    therdTrProps,
    thProps,
    tbodyProps,
    tbodyTrProps,
    tdProps,
    pagination,
    scroll,
    ...rest
  } = props
  const id = useId()

  const memoData = useMemo(() => {
    if (!pagination) return dataSource
    const { page, pageSize } = pagination
    return dataSource.slice(pageSize * (page - 1), page * pageSize)
  }, [dataSource, pagination])

  const memoColgroup = useMemo(
    () => (
      <colgroup>
        {columns.map((column) => (
          <col key={column.field.toString()} style={{ width: column.width }} />
        ))}
      </colgroup>
    ),
    [columns]
  )

  return (
    <div id={`table-${id}`}>
      <div id={`table-head-${id}`}>
        <TableRoot {...rest}>
          {memoColgroup}
          <TableHead {...theadProps}>
            <TableRow {...therdTrProps}>
              {columns.map((column) => (
                <TableHeadCell
                  key={column.field.toString()}
                  {...thProps}
                  style={{ textAlign: column.align || 'start', ...thProps?.style }}
                >
                  {column.name}
                </TableHeadCell>
              ))}
            </TableRow>
          </TableHead>
        </TableRoot>
      </div>
      <div id={`table-body-${id}`} style={scroll?.y ? { maxHeight: scroll.y, overflowY: 'scroll' } : undefined}>
        <TableRoot {...rest}>
          {memoColgroup}
          <TableBody {...tbodyProps}>
            {memoData.map((data, index) => (
              <TableRow
                key={typeof rowKey === 'function' ? rowKey(data, index) : (data[rowKey] as string)}
                data-index={index + 1}
                {...tbodyTrProps}
              >
                {columns.map((column) => (
                  <TableDateCell
                    key={column.field.toString()}
                    {...tdProps}
                    style={{ textAlign: column.align || 'start', ...tdProps?.style }}
                  >
                    {column.render?.(data[column.field], data, index) || (data[column.field] as React.ReactNode)}
                  </TableDateCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </div>
      {pagination && <Pagination {...pagination} />}
    </div>
  )
}

export interface TableProps<D extends object> extends React.ComponentPropsWithRef<typeof TableRoot> {
  columns: TableColumn<D>[]
  dataSource: D[]
  loading?: boolean
  rowKey?: keyof D | ((data: D, index: number) => string)
  theadProps?: React.ComponentPropsWithRef<typeof TableHead>
  therdTrProps?: React.ComponentPropsWithRef<typeof TableRow>
  thProps?: React.ComponentPropsWithRef<typeof TableHeadCell>
  tbodyProps?: React.ComponentPropsWithRef<typeof TableBody>
  tbodyTrProps?: React.ComponentPropsWithRef<typeof TableRow>
  tdProps?: React.ComponentPropsWithRef<typeof TableDateCell>
  pagination?: React.ComponentPropsWithRef<typeof Pagination>
  scroll?: {
    y?: string | number
  }
}

export type TableColumn<D extends object> = {
  [K in keyof D]: {
    name: React.ReactNode
    field: K
    align?: CSSProperties['textAlign']
    width?: CSSProperties['width']
    render?: (value: D[K], row: D, index: number) => React.ReactNode
  }
}[keyof D]
