import { useCallback, useMemo, useState } from 'react'

import { Address } from 'viem'
import { useWriteContract } from 'wagmi'

import { MiningPoolAbi } from '@/constants/abi'
import { useApprove } from '@/hooks/contracts/useErc20'
import { toRawAmount } from '@/lib/rawAmount'
import { useTokenProviderContext } from '@/providers/TokenProvider'

export const useTrade = () => {
  const { writeContractAsync } = useWriteContract()
  const { tokenInfo } = useTokenProviderContext()
  const [payAmount, setPayAmount] = useState('100')
  const [leader, setLeader] = useState('0x8e7272Ab041105B37C2dF015C63e5f3531aa3De1')

  const payRawAmount = useMemo(
    () => (tokenInfo && !isNaN(Number(payAmount)) ? toRawAmount(payAmount, tokenInfo?.stableToken.decimals) : 0n),
    [payAmount, tokenInfo]
  )

  const { approve } = useApprove({
    token: tokenInfo?.stableToken.address,
    spender: tokenInfo?.miningPool,
    amount: payRawAmount
  })

  const buy = useCallback(async () => {
    if (!tokenInfo) return

    try {
      await approve()
      await writeContractAsync({
        abi: MiningPoolAbi,
        address: tokenInfo.miningPool as Address,
        functionName: 'buy',
        args: [payRawAmount, leader as Address]
      })
    } catch {
      //
    }
  }, [approve, leader, payRawAmount, tokenInfo, writeContractAsync])

  return {
    leader,
    setLeader,
    buy,
    setPayAmount
  }
}
