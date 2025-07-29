import { useCallback, useEffect, useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Address } from 'viem'
import { useWriteContract } from 'wagmi'
import z from 'zod'

import { MiningPoolAbi } from '@/constants/abi'
import { useBalance, useTx } from '@/hooks/contracts/useErc20'
import { useSaleEstimate } from '@/hooks/contracts/useInfoContract'
import Calculator from '@/lib/calculator'
import { toRawAmount } from '@/lib/rawAmount'
import { useTokenProviderContext } from '@/providers/TokenProvider'

export enum TRADE_TYPE {
  BUY = 'buy',
  SELL = 'sell'
}

export const tradeFormSchema = z.object({
  tradeType: z.enum([TRADE_TYPE.BUY, TRADE_TYPE.SELL]),
  leader: z.string(),
  amountIn: z.string(),
  amountOut: z.string().optional()
})

export const useTrade = () => {
  const { writeContractAsync } = useWriteContract()
  const { tokenInfo, project } = useTokenProviderContext()

  const form = useForm<z.infer<typeof tradeFormSchema>>({
    resolver: zodResolver(tradeFormSchema),
    defaultValues: {
      tradeType: TRADE_TYPE.BUY,
      amountIn: '',
      amountOut: '',
      leader: '0x8e7272Ab041105B37C2dF015C63e5f3531aa3De1'
    }
  })

  const tradeType = form.watch('tradeType')
  const leader = form.watch('leader')
  const amountIn = form.watch('amountIn')
  // const amountOut = form.watch('amountOut')

  useEffect(() => {
    if (tradeType === TRADE_TYPE.BUY) {
      const previewAmountOut = Calculator.base(amountIn || 0)
        .multiply(Math.pow(1.01, project?.epoch || 0))
        .toNumber()
      form.setValue('amountOut', previewAmountOut ? previewAmountOut.toString() : '')
    }
  }, [amountIn, form, project?.epoch, tradeType])

  // LPH = USDC*1.01^n

  const rawAmountIn = useMemo(
    () => (tokenInfo && !isNaN(Number(amountIn)) ? toRawAmount(amountIn, tokenInfo.stableToken.decimals) : 0n),
    [amountIn, tokenInfo]
  )

  const saleEstimate = useSaleEstimate(
    tradeType === TRADE_TYPE.BUY && tokenInfo
      ? {
          id: tokenInfo.project.id,
          amountIn: rawAmountIn
        }
      : undefined
  )
  console.log('>>>>>> saleEstimate: ', saleEstimate)

  const { refetchBalance: refetchStableTokenBalance, balance: stableTokenBalance } = useBalance({
    token: tokenInfo?.stableToken.address
  })
  const { refetchBalance: refetchMintTokenBalance, balance: mintTokenBalance } = useBalance({
    token: tokenInfo?.mintToken.address
  })

  const { approve, transaction, refetchAllowance, isLoading } = useTx({
    approve: tokenInfo && { token: tokenInfo.stableToken.address, spender: tokenInfo.miningPool },
    onSuccess: () => {
      form.reset()
      refetchStableTokenBalance()
      refetchMintTokenBalance()
      refetchAllowance()
    }
  })

  const buy = useCallback(async () => {
    if (!tokenInfo) return
    await approve(rawAmountIn)
    await transaction(
      writeContractAsync({
        abi: MiningPoolAbi,
        address: tokenInfo.miningPool as Address,
        functionName: 'buy',
        args: [rawAmountIn, leader as Address]
      })
    )
  }, [approve, leader, rawAmountIn, tokenInfo, transaction, writeContractAsync])

  const sell = useCallback(async () => {
    if (!tokenInfo) return
    await approve(rawAmountIn)
    await transaction(
      writeContractAsync({
        abi: MiningPoolAbi,
        address: tokenInfo.miningPool as Address,
        functionName: 'sell',
        args: [rawAmountIn]
      })
    )
  }, [approve, rawAmountIn, tokenInfo, transaction, writeContractAsync])

  const handleSubmit = useCallback(
    (values: z.infer<typeof tradeFormSchema>) => {
      console.log('>>>>>> handleSubmit: values', values)
      if (values.tradeType === TRADE_TYPE.BUY) buy()
      else sell()

      // dialogRef.current?.close()
    },
    [buy, sell]
  )

  useEffect(() => {
    form.resetField('amountIn')
    form.resetField('amountOut')
  }, [form, tradeType])

  return {
    form,
    stableTokenBalance,
    mintTokenBalance,
    leader,
    tradeType,
    isLoading,
    buy,
    handleSubmit
  }
}

export const useClaim = () => {
  const { writeContractAsync } = useWriteContract()
  const { project, tokenInfo, userReward } = useTokenProviderContext()

  const { transaction, txStatus, isLoading } = useTx()

  const claimLPHRewards = useCallback(async () => {
    if (!tokenInfo) return
    await transaction(
      writeContractAsync({
        abi: MiningPoolAbi,
        address: tokenInfo.miningPool as Address,
        functionName: 'claimLPHRewards'
      })
    )
  }, [tokenInfo, transaction, writeContractAsync])

  const claimTHTSRewards = useCallback(async () => {
    if (!tokenInfo || !userReward) return
    await transaction(
      writeContractAsync({
        abi: MiningPoolAbi,
        address: tokenInfo.miningPool as Address,
        functionName: 'claimTHTSRewards',
        args: [BigInt(project?.epoch), BigInt(userReward.thRewardAcc), BigInt(userReward.tsRewardAcc), userReward.proof]
      })
    )
  }, [project?.epoch, tokenInfo, transaction, userReward, writeContractAsync])

  return {
    txStatus,
    isLoading,
    claimLPHRewards,
    claimTHTSRewards
  }
}
