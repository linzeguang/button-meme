import { type Token } from '@uniswap/sdk-core'
import { FeeAmount, Pool as V3Pool } from '@uniswap/v3-sdk'

import { FACTORY_ADDRESS } from '../constants'

import { computePoolAddress } from './computePoolAddress'

export class Pool extends V3Pool {
  public static getAddress(
    tokenA: Token,
    tokenB: Token,
    fee: FeeAmount,
    initCodeHashManualOverride?: string,
    factoryAddressOverride?: string
  ): string {
    return computePoolAddress({
      factoryAddress: factoryAddressOverride ?? FACTORY_ADDRESS,
      fee,
      tokenA,
      tokenB,
      initCodeHashManualOverride
    })
  }
}
