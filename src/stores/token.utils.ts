import { TokenInfo } from '@/hooks/contracts/types'

const bigintReplacer = (_key: string, value: any) => (typeof value === 'bigint' ? value.toString() : value)

const bigintReviver = (key: string, value: any) => {
  const bigintKeys = new Set([
    'startBlock',
    'totalLPH',
    'userRewardsAcc',
    'thRewardsAcc',
    'tsRewardsAcc',
    'burnedAmount'
  ])
  if (bigintKeys.has(key) && typeof value === 'string' && /^\d+$/.test(value)) {
    return BigInt(value)
  }
  return value
}

export const bigintSafeStorage = {
  getItem: (key: string): TokenInfo | undefined => {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return undefined
      return JSON.parse(raw, bigintReviver)
    } catch {
      return undefined
    }
  },
  setItem: (key: string, value: TokenInfo | undefined) => {
    if (value === undefined) return
    const json = JSON.stringify(value, bigintReplacer)
    localStorage.setItem(key, json)
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key)
  }
}
