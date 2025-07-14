export interface Project {
  name: string
  epoch: number
  id: number
}

export interface TokenInfo {
  miningPool: `0x${string}`
  stableToken: `0x${string}`
  checkMerkleRoot: boolean
  epochReleaseRate: number
  startBlock: bigint
  totalLPH: bigint
  userRewardsAcc: bigint
  thRewardsAcc: bigint
  tsRewardsAcc: bigint
  mintToken: {
    address: `0x${string}`
    name: string | undefined
    symbol: string | undefined
    decimals: number | undefined
    burnedAmount: bigint | undefined
  }
}

export interface TokenUserInfo {
  investedAcc: bigint
  lph: bigint
  lphRewardPending: bigint
  claimedRewardsLPH: bigint
  claimedRewardsTH: bigint
  claimedRewardsTS: bigint
  referencesCount: bigint
}
