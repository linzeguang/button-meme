import fetcher, { METHOD } from '@/lib/fetcher'
import {
  Bar,
  HistoryCallback,
  IBasicDataFeed,
  LibrarySymbolInfo,
  OnReadyCallback,
  PeriodParams,
  ResolutionString,
  ResolveCallback,
  SubscribeBarsCallback
} from 'public/charting_library/charting_library'

import { SUPPORTED_RESOLUTIONS } from '@/constants/tradingiew'

interface Kline {
  close: string
  high: string
  low: string
  open: string
  open_time: string
  volume: string
}

export default class DataFeed extends EventTarget implements IBasicDataFeed {
  onResetCacheNeededCallback?: () => void
  constructor() {
    super()
  }
  searchSymbols() {
    /* un support search symbols */
  }
  onReady(callback: OnReadyCallback) {
    setTimeout(() => {
      callback({
        supported_resolutions: SUPPORTED_RESOLUTIONS,
        supports_marks: false,
        supports_timescale_marks: false,
        supports_time: false
      })
    }, 0)
  }
  async resolveSymbol(symbolName: string, onResolve: ResolveCallback) {
    const symbolInfo = await this.generateSymbolInfo(symbolName)
    if (symbolInfo) setTimeout(() => onResolve(symbolInfo))
  }
  async getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onResult: HistoryCallback
  ) {
    console.log('>>>>>> getBars: ', { symbolInfo, resolution, periodParams })
    if (periodParams.firstDataRequest) {
      const data = await this.fetchHistory()
      onResult(data, { noData: false })
    }

    onResult([], { noData: true })
  }
  subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    _onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void
  ) {
    this.onResetCacheNeededCallback = onResetCacheNeededCallback
    console.log('>>>>>> subscribeBars: ', { symbolInfo, resolution, listenerGuid })
  }
  unsubscribeBars(listenerGuid: string) {
    console.log('>>>>>> unsubscribeBars: ', listenerGuid)
  }
  async generateSymbolInfo(symbolName: string) {
    const decimals = 15
    const pricescale = Math.pow(10, decimals)
    console.log('>>>>>> generateSymbolInfo: ', { symbolName })
    return {
      name: 'name',
      full_name: 'full_name',
      ticker: symbolName,
      description: 'symbolName',
      session: '24x7',
      minmov: 1,
      timezone: 'Etc/UTC',
      type: 'crypto',
      visible_plots_set: 'ohlc',
      // exchange: 'Button',
      listed_exchange: '-',
      pricescale,
      format: 'price',
      has_intraday: true,
      has_daily: true,
      has_weekly_and_monthly: true
    } as LibrarySymbolInfo
  }
  async fetchHistory(): Promise<Bar[]> {
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

      if (!data) throw false

      return (
        data?.map<Bar>(({ close, high, low, open, open_time }) => ({
          close: Number(close),
          high: Number(high),
          low: Number(low),
          open: Number(open),
          time: Number(open_time) * 1000
        })) || []
      )
    } catch {
      return []
    }
  }
}
