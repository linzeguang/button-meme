/**
 * 将带小数的 token 金额转换为 BigInt 形式的 raw amount。
 *
 * @param amount - 人类可读的金额，如 1.5、0.001
 * @param decimals - 代币精度，如 18（ETH、UNI）、6（USDC、USDT）
 * @returns BigInt raw amount
 */
export function toRawAmount(amount: number | string, decimals: number): bigint {
  const [intPart, decimalPart = ''] = amount.toString().split('.')

  const fullDecimals = decimalPart.padEnd(decimals, '0').slice(0, decimals)
  const rawStr = `${intPart}${fullDecimals || ''}` || '0'

  return BigInt(rawStr)
}

/**
 * 将 raw amount 反向转换为可读字符串（保留小数）
 */
export function fromRawAmount(rawAmount: bigint, decimals: number): string {
  const str = rawAmount.toString().padStart(decimals + 1, '0')
  const intPart = str.slice(0, -decimals)
  const decimalPart = str.slice(-decimals).replace(/0+$/, '') || '0'

  return `${intPart}.${decimalPart}`
}
