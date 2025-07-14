import { useCallback } from 'react'

import { Address, erc20Abi } from 'viem'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'

export const useApprove = (parmas: { amount: bigint; token?: Address; spender?: Address }) => {
  const { amount, token, spender } = parmas
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const { data: allowance } = useReadContract({
    abi: erc20Abi,
    address: token,
    functionName: 'allowance',
    args: address && spender && [address as Address, spender],
    query: {
      enabled: !!address && !!spender
    }
  })

  const approve = useCallback(async () => {
    if (!token || !spender) return
    if (allowance && allowance > amount) return

    await writeContractAsync({
      abi: erc20Abi,
      address: token,
      functionName: 'approve',
      args: [spender, amount]
    })
  }, [allowance, amount, spender, token, writeContractAsync])

  return {
    allowance,
    approve
  }
}
