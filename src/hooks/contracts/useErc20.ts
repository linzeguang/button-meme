import { useCallback, useEffect, useId, useMemo, useState } from 'react'

import { t } from '@lingui/core/macro'
import toast from 'react-hot-toast'
import { Address, erc20Abi, maxUint256 } from 'viem'
import { useAccount, useReadContract, useReadContracts, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

import { useMemoWithLocale } from '@/hooks/useWithLocale'
import { fromRawAmount } from '@/lib/rawAmount'

export enum TX_STATUS {
  Idle = 'IDLE', // 未发起
  PendingUser = 'PENDING_USER', // 等待用户签名
  Approving = 'APPROVING', // 正在进行 Approve 授权交易
  Submitted = 'SUBMITTED', // 已提交主交易
  Confirmed = 'CONFIRMED', // 主交易确认成功
  Failed = 'FAILED', // 主交易失败
  Rejected = 'REJECTED' // 用户拒绝签名
}

export const useBalance = (token?: Address) => {
  const { address } = useAccount()

  const { data, refetch: refetchBalance } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: token,
        functionName: 'balanceOf',
        args: address && [address]
      },
      {
        abi: erc20Abi,
        address: token,
        functionName: 'decimals'
      },
      {
        abi: erc20Abi,
        address: token,
        functionName: 'symbol'
      }
    ],
    query: {
      enabled: Boolean(token && address)
    }
  })

  return useMemo(() => {
    if (!data) return { refetchBalance, balance: undefined }
    const [{ result: value }, { result: decimals }, { result: symbol }] = data

    return {
      balance: {
        value,
        decimals,
        symbol,
        formatted: fromRawAmount(value || 0n, decimals || 18)
      },
      refetchBalance
    }
  }, [data, refetchBalance])
}

export const useApprove = (parmas?: { token: Address; spender: Address }) => {
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: erc20Abi,
    address: parmas?.token,
    functionName: 'allowance',
    args: address && parmas?.spender && [address as Address, parmas.spender],
    query: {
      enabled: !!address && !!parmas?.spender
    }
  })

  const approve = useCallback(
    async (amount: bigint) => {
      console.log('>>>>>> allowance: ', {
        allowance,
        ...parmas
      })
      if (!parmas) return
      if (allowance && allowance > amount) return

      await writeContractAsync({
        abi: erc20Abi,
        address: parmas.token,
        functionName: 'approve',
        args: [parmas.spender, maxUint256]
      })
    },
    [allowance, parmas, writeContractAsync]
  )

  return {
    allowance,
    refetchAllowance,
    approve
  }
}

export const useTx = (parmas?: { approve: Parameters<typeof useApprove>[0]; onSuccess?: () => void }) => {
  const toastId = useId()

  const [txStatus, setTxStatus] = useState<TX_STATUS>(TX_STATUS.Idle)
  const [txHash, setTxHash] = useState<string | undefined>(undefined)
  const { allowance, approve: approveTx, refetchAllowance } = useApprove(parmas ? parmas.approve : undefined)
  const { isSuccess, isError, error, data } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,
    query: { enabled: !!txHash }
  })

  const TX_STATUS_TEXT_MAP = useMemoWithLocale<Record<TX_STATUS, string>>(
    () => ({
      [TX_STATUS.Idle]: t`Awaiting action`,
      [TX_STATUS.PendingUser]: t`Please confirm the transaction in your wallet`,
      [TX_STATUS.Approving]: t`Approving... Please wait`,
      [TX_STATUS.Submitted]: t`Transaction submitted, waiting for confirmation`,
      [TX_STATUS.Confirmed]: t`Transaction confirmed successfully`,
      [TX_STATUS.Failed]: t`Transaction failed, please try again`,
      [TX_STATUS.Rejected]: t`Transaction rejected by user`
    }),
    []
  )

  const approve = useCallback(
    async (...args: Parameters<typeof approveTx>) => {
      try {
        setTxStatus(TX_STATUS.Approving)
        await approveTx(...args)
      } catch (error) {
        setTxStatus(TX_STATUS.Rejected)
        throw error
      }
    },
    [approveTx]
  )

  const transaction = useCallback(async (transactionFn: Promise<Address>) => {
    try {
      setTxStatus(TX_STATUS.PendingUser)
      const txhash = await transactionFn
      console.log('>>>>>> txhash: ', txhash)
      setTxStatus(TX_STATUS.Submitted)
      setTxHash(txhash)
    } catch (error) {
      console.error('>>>>>> transaction error: ', error)
      setTxStatus(TX_STATUS.Rejected)
      setTxHash(undefined)
      throw error
    }
  }, [])

  useEffect(() => {
    if (data) console.log('>>>>>> data: ', data)
  }, [data])

  useEffect(() => {
    if (isSuccess) setTxStatus(TX_STATUS.Confirmed)
  }, [isSuccess])

  useEffect(() => {
    if (isError && error) {
      console.error(error)
      setTxStatus(TX_STATUS.Failed)
    }
  }, [error, isError])

  useEffect(() => {
    if ([TX_STATUS.Approving, TX_STATUS.PendingUser, TX_STATUS.Submitted].includes(txStatus)) {
      toast.loading(TX_STATUS_TEXT_MAP[txStatus], { id: toastId })
    } else if ([TX_STATUS.Rejected, TX_STATUS.Failed].includes(txStatus)) {
      toast.error(TX_STATUS_TEXT_MAP[txStatus], { id: toastId })
    } else if ([TX_STATUS.Confirmed].includes(txStatus)) {
      toast.success(TX_STATUS_TEXT_MAP[txStatus], { id: toastId })
      setTimeout(() => {
        setTxStatus(TX_STATUS.Idle)
      }, 3000)
    } else {
      // TX_STATUS.Idle
    }
  }, [TX_STATUS_TEXT_MAP, toastId, txStatus])

  return {
    toastId,
    txHash,
    txStatus,
    allowance,
    isLoading: [TX_STATUS.PendingUser, TX_STATUS.Submitted, TX_STATUS.Approving].includes(txStatus),
    approve,
    refetchAllowance,
    transaction
  }
}
