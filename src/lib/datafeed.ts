import { Datafeed as BaseDatafeed, DatafeedSubscribeCallback, Period, SymbolInfo } from '@klinecharts/pro'
import { KLineData } from 'klinecharts'

import fetcher, { METHOD } from '@/lib/fetcher'

interface Kline {
  close: string
  high: string
  low: string
  open: string
  open_time: string
  volume: string
}

export default class Datafeed implements BaseDatafeed {
  searchSymbols(search?: string): Promise<SymbolInfo[]> {
    throw new Error('Method not implemented.')
  }
  async getHistoryKLineData(symbol: SymbolInfo, period: Period, from: number, to: number): Promise<KLineData[]> {
    console.log('>>>>>> getHistoryKLineData: ', {
      symbol,
      period,
      from,
      to
    })
    try {
      const data = await fetcher<Kline[]>({
        url: '/getKine.php',
        method: METHOD.GET,
        data: {
          ca: '0x3e7712cf29164432efc6ef0aa669c10b674efe43',
          interval: '1m'
        },
        php: true
      })

      return (
        data?.map<KLineData>(({ close, high, low, open, open_time }) => ({
          close: Number(close),
          high: Number(high),
          low: Number(low),
          open: Number(open),
          timestamp: Number(open_time) * 1000
        })) || []
      )
    } catch {
      return []
    }
  }
  subscribe(symbol: SymbolInfo, period: Period, callback: DatafeedSubscribeCallback): void {
    // throw new Error('Method not implemented.')
  }
  unsubscribe(symbol: SymbolInfo, period: Period): void {
    // throw new Error('Method not implemented.')
  }
}
