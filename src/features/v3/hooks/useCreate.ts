import { useCallback, useMemo } from 'react'

import { CurrencyAmount, Percent, type Token } from '@uniswap/sdk-core'
import {
  encodeSqrtRatioX96,
  FeeAmount,
  nearestUsableTick,
  NonfungiblePositionManager,
  Position,
  TICK_SPACINGS,
  TickMath
} from '@uniswap/v3-sdk'
import { useAccount, useSendTransaction } from 'wagmi'

import { useApproveCallback } from '@/features/hooks/useApproveCallback'
import { NONFUNGIBLE_POSITION_MANAGER } from '@/features/v3/constants'
import { Pool } from '@/features/v3/utils/pool'
import { toRawAmount } from '@/features/v3/utils/rawAmount'

export const useCreate = ({
  token0,
  token1,
  fee = FeeAmount.HIGH,
  price,
  amount0,
  amount1
}: {
  token0: Token
  token1: Token
  fee?: FeeAmount
  price: number
  amount0: string
  amount1: string
}) => {
  const slippageTolerance = new Percent(50, 100)
  const deadline = Math.floor(Date.now() / 1000) + 60 * 10

  const { address } = useAccount()

  const { sendTransaction, sendTransactionAsync } = useSendTransaction()

  const [approvalState0, approveToken0] = useApproveCallback(
    CurrencyAmount.fromRawAmount(token0, amount0),
    NONFUNGIBLE_POSITION_MANAGER
  )
  const [approvalState1, approveToken1] = useApproveCallback(
    CurrencyAmount.fromRawAmount(token1, amount1),
    NONFUNGIBLE_POSITION_MANAGER
  )

  const [, position] = useMemo(() => {
    const sqrtRatioX96 = encodeSqrtRatioX96(
      toRawAmount(1, token0.decimals).toString(),
      toRawAmount(price, token1.decimals).toString()
    )
    const currentTick = TickMath.getTickAtSqrtRatio(sqrtRatioX96)

    const pool = new Pool(
      token0,
      token1,
      fee,
      sqrtRatioX96.toString(),
      1, // 可能是 0
      currentTick,
      []
    )

    const tickSpacing = TICK_SPACINGS[fee],
      // tickLower = nearestUsableTick(TickMath.MIN_TICK, tickSpacing),
      // tickUpper = nearestUsableTick(TickMath.MAX_TICK, tickSpacing)
      tickLower = nearestUsableTick(currentTick - tickSpacing * 10, tickSpacing),
      tickUpper = nearestUsableTick(currentTick + tickSpacing * 10, tickSpacing)

    const position = Position.fromAmounts({
      pool,
      tickLower,
      tickUpper,
      amount0: amount0.toString(),
      amount1: amount1.toString(),
      useFullPrecision: true
    })

    console.log('>>>>>> useCreate: ', position.liquidity.toString(), {
      pool,
      tickLower,
      tickUpper,
      amount0: amount0.toString(),
      amount1: amount1.toString(),
      useFullPrecision: true,
      position
    })

    return [pool, position]
  }, [amount0, amount1, fee, price, token0, token1])

  const create = useCallback(async () => {
    if (!address) return

    const { calldata, value } = NonfungiblePositionManager.addCallParameters(position, {
      recipient: address,
      slippageTolerance,
      deadline,
      createPool: true
    })

    sendTransactionAsync({
      to: NONFUNGIBLE_POSITION_MANAGER,
      data: calldata as `0x${string}`,
      value: BigInt(value)
    })
      .then((res) => {
        console.warn(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [address, position, sendTransactionAsync, slippageTolerance])

  return {
    create
  }
}
