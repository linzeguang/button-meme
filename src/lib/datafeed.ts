import { SUPPORTED_RESOLUTIONS, SUPPORTED_RESOLUTIONS_MAP } from '@/constants/tradingiew'
import { TokenInfo } from '@/hooks/contracts/types'
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
    if (periodParams.firstDataRequest) {
      const data = await this.fetchHistory(symbolInfo.ticker!, resolution)
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
    const [address, name, symbol] = this.parseInitSymbol(symbolName)
    const pricescale = Math.pow(10, 18)
    return {
      name: symbol,
      full_name: name,
      ticker: address,
      description: symbol,
      session: '24x7',
      minmov: 1,
      timezone: 'Etc/UTC',
      type: 'crypto',
      visible_plots_set: 'ohlc',
      exchange: 'Button',
      listed_exchange: '-',
      pricescale,
      format: 'price',
      has_intraday: true,
      has_daily: true,
      has_weekly_and_monthly: true
    } as LibrarySymbolInfo
  }
  async fetchHistory(ticker: string, resolution: ResolutionString): Promise<Bar[]> {
    try {
      // const data = await fetcher<Kline[]>({
      //   url: '/getKine.php',
      //   method: METHOD.GET,
      //   data: {
      //     ca: ticker,
      //     interval: SUPPORTED_RESOLUTIONS_MAP[resolution]
      //   },
      //   php: true
      // })

      // if (!data) return []
      // return (
      //   data?.map<Bar>(({ close, high, low, open, open_time }) => ({
      //     close: Number(close),
      //     high: Number(high),
      //     low: Number(low),
      //     open: Number(open),
      //     time: Number(open_time) * 1000
      //   })) || []
      // )
      return []
    } catch {
      return []
    }
  }
  static generateInitSymbol(info: TokenInfo['mintToken']) {
    const { address, name, symbol, decimals } = info
    return `${address}-${name}-${symbol}-${decimals}`
  }
  parseInitSymbol(initSymbol: string) {
    return initSymbol.split('-')
  }
}
