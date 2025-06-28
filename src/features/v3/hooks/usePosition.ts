import { useCallback, useMemo } from 'react'

import { nearestUsableTick, NonfungiblePositionManager, Position, TICK_SPACINGS, TickMath } from '@uniswap/v3-sdk'

import { Pool } from '@/features/v3/utils/pool'

export const usePosition = (pool: Pool | undefined) => {
  const position = useMemo(() => {
    if (!pool) return undefined
    const tickSpacing = TICK_SPACINGS[pool.fee]
    // const tickLower = nearestUsableTick(pool.tickCurrent - 10 * tickSpacing, tickSpacing)
    // const tickUpper = nearestUsableTick(pool.tickCurrent + 10 * tickSpacing, tickSpacing)

    return new Position({
      pool,
      liquidity: 1,
      tickLower: nearestUsableTick(TickMath.MIN_TICK, tickSpacing),
      tickUpper: nearestUsableTick(TickMath.MAX_TICK, tickSpacing)
    })
  }, [pool])

  const create = useCallback(() => {
    if (!pool) return
    const { calldata, value } = NonfungiblePositionManager.createCallParameters(pool)

    console.log('>>>>>> create: ', { calldata, value })
  }, [pool])

  return {
    position,
    create
  }
}
