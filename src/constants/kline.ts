import { Period } from '@klinecharts/pro'

export enum INTERVAL {
  MINUTE_1 = '1m',
  MINUTE_5 = '5m',
  MINUTE_15 = '15m',
  MINUTE_30 = '30m',
  HOUR_1 = '1h',
  HOUR_4 = '4h',
  DAY_1 = '1d',
  WEEK_1 = '1w'
}

export const PERIODS: Record<INTERVAL, Period> = {
  [INTERVAL.MINUTE_1]: {
    multiplier: 1,
    timespan: 'minute',
    text: '1m'
  },
  [INTERVAL.MINUTE_5]: {
    multiplier: 5,
    timespan: 'minute',
    text: '5m'
  },
  [INTERVAL.MINUTE_15]: {
    multiplier: 15,
    timespan: 'minute',
    text: '15m'
  },
  [INTERVAL.MINUTE_30]: {
    multiplier: 30,
    timespan: 'minute',
    text: '30m'
  },
  [INTERVAL.HOUR_1]: {
    multiplier: 1,
    timespan: 'hour',
    text: '1h'
  },
  [INTERVAL.HOUR_4]: {
    multiplier: 4,
    timespan: 'hour',
    text: '4h'
  },
  [INTERVAL.DAY_1]: {
    multiplier: 1,
    timespan: 'day',
    text: '1d'
  },
  [INTERVAL.WEEK_1]: {
    multiplier: 1,
    timespan: 'week',
    text: '1w'
  }
}
