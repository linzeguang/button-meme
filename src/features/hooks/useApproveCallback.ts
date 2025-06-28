import { useCallback, useMemo, useState } from 'react'

import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import { type Address, erc20Abi } from 'viem'
import { useAccount, useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

import { useTokenAllowance } from '@/features/hooks/useTokenAllowance'
import { assume0xAddress } from '@/features/utils/wagmi'

export enum ApprovalState {
  UNKNOWN = 'UNKNOWN',
  NOT_APPROVED = 'NOT_APPROVED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED'
}

export function useApproveCallback(
  amountToApprove?: CurrencyAmount<Token>,
  spender?: string
): [ApprovalState, () => void] {
  const currency = amountToApprove?.currency

  const [approveTx, setApproveTx] = useState<Address>()
  const { isLoading } = useWaitForTransactionReceipt({
    hash: approveTx,
    query: {
      enabled: !!approveTx
    }
  })

  const { writeContract } = useWriteContract()
  const { address } = useAccount()
  const currentAllowance = useTokenAllowance(currency, address ?? undefined, spender)

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN
    if (amountToApprove.currency.isNative) return ApprovalState.APPROVED
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN
    // amountToApprove will be defined if currentAllowance is

    return currentAllowance.lessThan(amountToApprove)
      ? isLoading
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [amountToApprove, currentAllowance, isLoading, spender])

  const { data: simulate } = useSimulateContract({
    abi: erc20Abi,
    chainId: currency?.chainId,
    address: assume0xAddress(currency?.address),
    functionName: 'approve',
    args: [spender! as Address, BigInt(amountToApprove?.quotient.toString() || 0)],
    query: {
      enabled: !!spender && !!amountToApprove?.quotient.toString()
    }
  })
  const approve = useCallback(() => {
    if (approvalState !== ApprovalState.NOT_APPROVED) return
    if (!currency) return
    if (!amountToApprove) return
    if (!spender) return
    if (!simulate) return

    return writeContract(simulate.request, {
      onSuccess: (tx) => {
        setApproveTx(tx)
      }
    })
  }, [approvalState, currency, amountToApprove, spender, simulate, writeContract])

  return [approvalState, approve]
}

// export function useApproveCallbackFromTrade(trade?: ITrade, allowedSlippage = 0) {
//   const amountToApprove = useMemo(
//     () => (trade ? computeSlippageAdjustedAmounts(trade, allowedSlippage)[Field.INPUT] : undefined),
//     [trade, allowedSlippage]
//   )
//   return useApproveCallback(amountToApprove, ROUTER)
// }
