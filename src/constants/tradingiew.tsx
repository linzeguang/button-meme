import { formatLargeNumber } from '@/lib/format'
import {
  ChartingLibraryFeatureset,
  ChartingLibraryWidgetOptions,
  ResolutionString,
  ThemeName,
  TimeFrameItem,
  WidgetOverrides
} from 'public/charting_library/charting_library'

export const SUPPORTED_RESOLUTIONS_MAP = {
  '1': '1m',
  '5': '5m',
  '15': '15m',
  '30': '30m',
  '60': '1h',
  '240': '4h',
  '1D': '1d',
  '1W': '1w'
} as Record<ResolutionString, string>

export const Supported_Resolutions_To_Minute = {
  '1': 1,
  '5': 5,
  '15': 15,
  '30': 30,
  '60': 60,
  '240': 4 * 60,
  '1D': 24 * 60,
  '1W': 7 * 24 * 60
} as Record<string, number>

export const SUPPORTED_RESOLUTIONS = Object.keys(SUPPORTED_RESOLUTIONS_MAP) as ResolutionString[]

export const DEFAULT_RESOLUTIONS = SUPPORTED_RESOLUTIONS[0] // 1m

const RED = '#ef4444'
const GREEN = '#10b981'

const COLOR: Record<
  ThemeName,
  {
    BACKGROUND: string
    BORDER: string
    TEXTCOLOR: string
  }
> = {
  light: {
    BACKGROUND: '#ffffff',
    BORDER: '#ededed',
    TEXTCOLOR: '#555'
  },
  dark: {
    BACKGROUND: '#131313',
    BORDER: '#2a2a2a',
    TEXTCOLOR: '#fff'
  }
}

const chartStyleOverrides = ['candleStyle', 'hollowCandleStyle', 'haStyle'].reduce<Partial<WidgetOverrides>>(
  (acc, cv) => {
    acc[`mainSeriesProperties.${cv}.drawWick`] = true
    acc[`mainSeriesProperties.${cv}.drawBorder`] = false
    acc[`mainSeriesProperties.${cv}.upColor`] = GREEN
    acc[`mainSeriesProperties.${cv}.downColor`] = RED
    acc[`mainSeriesProperties.${cv}.wickUpColor`] = GREEN
    acc[`mainSeriesProperties.${cv}.wickDownColor`] = RED
    acc[`mainSeriesProperties.${cv}.borderUpColor`] = GREEN
    acc[`mainSeriesProperties.${cv}.borderDownColor`] = RED
    return acc
  },
  {}
)

export const getChartOverrides = (
  theme: ThemeName
): Pick<Partial<ChartingLibraryWidgetOptions>, 'overrides' | 'loading_screen' | 'theme'> => {
  const FOREGROUND = theme === 'dark' ? '#8bfe83' : '#00cc66'
  return {
    overrides: {
      'scales.properties.show_left_scale': true,
      'scales.properties.show_right_scale': true,
      'paneProperties.topMargin': 16,
      'paneProperties.bottomMargin': 12,
      'paneProperties.background': COLOR[theme].BACKGROUND,
      'paneProperties.backgroundGradientStartColor': COLOR[theme].BACKGROUND,
      'paneProperties.backgroundGradientEndColor': COLOR[theme].BACKGROUND,
      'paneProperties.backgroundType': 'solid',
      // 'paneProperties.vertGridProperties.color': 'rgba(35, 38, 59, 1)',
      // 'paneProperties.vertGridProperties.style': 2,
      // 'paneProperties.horzGridProperties.color': 'rgba(35, 38, 59, 1)',
      // 'paneProperties.horzGridProperties.style': 2,
      // 'mainSeriesProperties.priceLineColor': '#3a3e5e',
      'scalesProperties.textColor': COLOR[theme].TEXTCOLOR,
      'scalesProperties.lineColor': COLOR[theme].BORDER,
      // 'mainSeriesProperties.statusViewStyle.showExchange': false,
      ...chartStyleOverrides
    },
    loading_screen: {
      backgroundColor: COLOR[theme].BACKGROUND,
      foregroundColor: FOREGROUND
    },
    theme
  }
}

const disabledFeatures: ChartingLibraryFeatureset[] = [
  'volume_force_overlay',
  'create_volume_indicator_by_default',
  'symbol_search_hot_key',
  'display_market_status',
  'show_interval_dialog_on_key_press',
  'popup_hints',
  'header_in_fullscreen_mode',
  'use_localstorage_for_settings',
  'right_bar_stays_on_scroll',
  'symbol_info',
  'edit_buttons_in_legend',
  'header_chart_type',
  'header_compare',
  'header_symbol_search',
  'header_undo_redo',
  'header_saveload',
  'header_settings',
  'header_fullscreen_button',
  'header_screenshot',
  'header_indicators',
  'timeframes_toolbar',
  // 'horz_touch_drag_scroll'
  'vert_touch_drag_scroll'
]

const enabledFeatures: ChartingLibraryFeatureset[] = [
  'side_toolbar_in_fullscreen_mode',
  'header_in_fullscreen_mode',
  'items_favoriting',
  'hide_left_toolbar_by_default'
]

export const defaultChartProps = {
  locale: 'en',
  library_path: '/charting_library/',
  client_id: 'tradingview.com',
  user_id: 'public_user_id',
  fullscreen: false,
  autosize: true,
  custom_css_url: '/charting_library/tradingview-chart.css',
  disabled_features: disabledFeatures,
  enabled_features: enabledFeatures,
  time_frames: [
    { text: '5m', resolution: '5', description: '5' },
    { text: '1m', resolution: '1', description: '1' }
  ] as TimeFrameItem[],
  favorites: {
    intervals: SUPPORTED_RESOLUTIONS
  },
  custom_formatters: {
    priceFormatterFactory: () => ({
      // 定义格式化方法，将价格值格式化为自定义样式
      format: (value: any) => formatLargeNumber(value, undefined, 6) // 使用前导零格式化价格
    })
  } as any
} satisfies Partial<ChartingLibraryWidgetOptions>
