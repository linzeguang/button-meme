import { useMemo } from 'react'

import { ADDRESS_ZERO, FeeAmount } from '@uniswap/v3-sdk'
import { useReadContract } from 'wagmi'

import { FACTORY_ADDRESS } from '@/features/v3/constants'
import { FACTORY_ABI, POOL_ABI } from '@/features/v3/constants/abi'

import { Pool } from '../utils/pool'

import type { Token } from '@uniswap/sdk-core'
import type { Address } from 'viem'

export const usePool = (tokenA: Token, tokenB: Token, fee: FeeAmount = FeeAmount.HIGH) => {
  const { data: poolAddress } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: 'getPool',
    args: [tokenA.address as Address, tokenB.address as Address, fee]
  })
  const { data: poolSlot0 } = useReadContract({
    address: poolAddress as Address,
    abi: POOL_ABI,
    functionName: 'slot0',
    query: {
      enabled: poolAddress !== ADDRESS_ZERO
    }
  })
  const { data: poolLiquidity } = useReadContract({
    address: poolAddress as Address,
    abi: POOL_ABI,
    functionName: 'liquidity',
    query: {
      enabled: poolAddress !== ADDRESS_ZERO
    }
  })

  const { isDeployed, isInitialized, hasLiquidity, sqrtPriceX96, pool } = useMemo(() => {
    // 池子是否部署
    const isDeployed = !!(poolAddress && poolAddress !== ADDRESS_ZERO)
    // 初始化价格
    const [sqrtPriceX96, tick] = poolSlot0 || []
    // 是否初始化
    const isInitialized = typeof sqrtPriceX96 === 'bigint' && sqrtPriceX96 > 0n
    // 是否有流动性
    const hasLiquidity = typeof poolLiquidity === 'bigint' && poolLiquidity > 0n

    let pool: Pool | undefined = undefined

    if (isDeployed && isInitialized && hasLiquidity && tick) {
      pool = new Pool(
        tokenA,
        tokenB,
        fee,
        sqrtPriceX96.toString(),
        poolLiquidity.toString(), // 可能是 0
        tick
      )
    }

    return { isDeployed, isInitialized, hasLiquidity, sqrtPriceX96, pool }
  }, [fee, poolAddress, poolLiquidity, poolSlot0, tokenA, tokenB])

  return {
    pool,
    poolAddress,
    isDeployed,
    isInitialized,
    hasLiquidity,
    sqrtPriceX96
  }
}
