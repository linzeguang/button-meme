import BigNumber from 'bignumber.js'

export function formatAddress(
  address: string = '',
  startChars: number = 4,
  endChars: number = -4,
  separator: string = '...'
) {
  return `${address.slice(0, startChars)}${separator}${endChars ? address.slice(endChars) : ''}`
}

export function formatNumber(
  value: BigNumber.Value,
  decimalPlaces: number = 2,
  roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN
) {
  return new BigNumber(value).toFixed(decimalPlaces, roundingMode)
}
