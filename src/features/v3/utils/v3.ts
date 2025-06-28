import { Percent, Price, type Token } from '@uniswap/sdk-core'
import {
  encodeSqrtRatioX96,
  FeeAmount,
  nearestUsableTick,
  NonfungiblePositionManager,
  Position,
  TICK_SPACINGS,
  TickMath
} from '@uniswap/v3-sdk'

import { Pool } from '@/features/v3/utils/pool'
import { toRawAmount } from '@/features/v3/utils/rawAmount'

import type { Address } from 'viem'

export class V3 {
  constructor() {
    //
  }

  getPool(...args: ConstructorParameters<typeof Pool>) {
    return new Pool(...args)
  }

  getPosition(...args: ConstructorParameters<typeof Position>) {
    return new Position(...args)
  }

  getPositionFromAmounts(...args: Parameters<typeof Position.fromAmounts>) {
    return Position.fromAmounts(...args)
  }

  // 创建资金池
  createPool(
    recipient: Address,
    options: {
      tokenA: Token
      tokenB: Token
      fee: FeeAmount
      price: number
      slippageTolerance: Percent
      deadline: number
    }
  ) {
    const { tokenA, tokenB, fee, price, slippageTolerance, deadline } = options

    const numerator = toRawAmount(price, tokenB.decimals)
    const denominator = toRawAmount(1, tokenA.decimals)
    const sqrtRatioX96 = encodeSqrtRatioX96(numerator.toString(), denominator.toString())
    const tickCurrent = TickMath.getTickAtSqrtRatio(sqrtRatioX96)

    const pool = this.getPool(tokenA, tokenB, fee, sqrtRatioX96, 1, tickCurrent, [])

    const tickSpacing = TICK_SPACINGS[fee]
    // const tickLower = nearestUsableTick(tickCurrent - 10 * tickSpacing, tickSpacing)
    // const tickUpper = nearestUsableTick(tickCurrent + 10 * tickSpacing, tickSpacing)
    const tickLower = nearestUsableTick(TickMath.MIN_TICK, tickSpacing)
    const tickUpper = nearestUsableTick(TickMath.MAX_TICK, tickSpacing)

    const position = this.getPositionFromAmounts({
      pool,
      tickLower,
      tickUpper,
      amount0: toRawAmount(1000, tokenA.decimals).toString(),
      amount1: toRawAmount(price * 1000, tokenB.decimals).toString(),
      useFullPrecision: true
    })

    return NonfungiblePositionManager.addCallParameters(position, {
      recipient,
      slippageTolerance,
      deadline,
      createPool: true
    })
  }
  // 添加流动性
  increase(
    recipient: Address,
    pool: Pool,
    options: {
      price: number
      slippageTolerance: Percent
      deadline: number
    }
  ) {
    // const { slippageTolerance, deadline } = options
    // return NonfungiblePositionManager.addCallParameters(position, {
    //   recipient,
    //   slippageTolerance,
    //   deadline
    // })
  }
  decrease() {
    // 移除流动性
  }
  claim() {
    // 收取费用
  }
}
