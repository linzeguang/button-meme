import { useCallback, useEffect, useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { Address, zeroAddress } from 'viem'
import { useWriteContract } from 'wagmi'
import z from 'zod'

import { inviteKey } from '@/components/token/Invite'
import { MiningPoolAbi } from '@/constants/abi'
import { useBalance, useTx } from '@/hooks/contracts/useErc20'
import { useSaleEstimate } from '@/hooks/contracts/useInfoContract'
import Calculator from '@/lib/calculator'
import { fromRawAmount, toRawAmount } from '@/lib/rawAmount'
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
  const [searchParams] = useSearchParams()

  const { writeContractAsync } = useWriteContract()
  const { tokenInfo, project } = useTokenProviderContext()

  const form = useForm<z.infer<typeof tradeFormSchema>>({
    resolver: zodResolver(tradeFormSchema),
    defaultValues: {
      tradeType: TRADE_TYPE.BUY,
      amountIn: '',
      amountOut: '',
      leader: searchParams.get(inviteKey) || ''
    }
  })

  const tradeType = form.watch('tradeType')
  const leader = form.watch('leader')
  const amountIn = form.watch('amountIn')

  useEffect(() => {
    if (tradeType === TRADE_TYPE.BUY) {
      const previewAmountOut = Calculator.base(amountIn || 0)
        .multiply(Math.pow(1.01, project?.epoch || 0))
        .toNumber()
      form.setValue('amountOut', previewAmountOut ? previewAmountOut.toString() : '')
    }
  }, [amountIn, form, project?.epoch, tradeType])

  const rawAmountIn = useMemo(
    () =>
      tokenInfo && !isNaN(Number(amountIn))
        ? toRawAmount(
            amountIn,
            tradeType === TRADE_TYPE.BUY ? tokenInfo.stableToken.decimals : tokenInfo.mintToken.decimals
          )
        : 0n,
    [amountIn, tokenInfo, tradeType]
  )

  const saleEstimate = useSaleEstimate(
    tradeType === TRADE_TYPE.SELL && tokenInfo
      ? {
          id: tokenInfo.project.id,
          amountIn: rawAmountIn
        }
      : undefined
  )

  const { refetchBalance: refetchStableTokenBalance, balance: stableTokenBalance } = useBalance(
    tokenInfo?.stableToken.address
  )
  const { refetchBalance: refetchMintTokenBalance, balance: mintTokenBalance } = useBalance(
    tokenInfo?.mintToken.address
  )

  const { approve, transaction, refetchAllowance, isLoading } = useTx({
    approve:
      tokenInfo &&
      (tradeType === TRADE_TYPE.BUY
        ? { token: tokenInfo.stableToken.address, spender: tokenInfo.miningPool }
        : { token: tokenInfo.mintToken.address, spender: tokenInfo.miningPool }),
    onSuccess: () => {
      form.reset()
      refetchStableTokenBalance()
      refetchMintTokenBalance()
      refetchAllowance()
    }
  })

  const buy = useCallback(async () => {
    if (!tokenInfo) return
    console.log('>>>>>> trade buy: ', { rawAmountIn, args: [rawAmountIn, (leader || zeroAddress) as Address] })
    await approve(rawAmountIn)
    await transaction(
      writeContractAsync({
        abi: MiningPoolAbi,
        address: tokenInfo.miningPool as Address,
        functionName: 'buy',
        args: [rawAmountIn, (leader || zeroAddress) as Address]
      })
    )
  }, [approve, leader, rawAmountIn, tokenInfo, transaction, writeContractAsync])

  const sell = useCallback(async () => {
    if (!tokenInfo) return
    console.log('>>>>>> trade sell: ', { rawAmountIn, args: [rawAmountIn] })
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
    async (values: z.infer<typeof tradeFormSchema>) => {
      console.log('>>>>>> handleSubmit: values', values)
      if (values.tradeType === TRADE_TYPE.BUY) {
        await buy()
      } else {
        await sell()
      }
    },
    [buy, sell]
  )

  useEffect(() => {
    form.resetField('amountIn')
    form.resetField('amountOut')
  }, [form, tradeType])

  useEffect(() => {
    if (saleEstimate && tokenInfo && saleEstimate.totalFund) {
      form.setValue('amountOut', fromRawAmount(saleEstimate.totalFund, tokenInfo.stableToken.decimals))
    }
  }, [form, saleEstimate, tokenInfo])

  return {
    form,
    amountIn,
    stableTokenBalance,
    mintTokenBalance,
    leader,
    tradeType,
    isLoading,
    saleEstimate,
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
    console.log('>>>>>> claimLPHRewards: ')
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
    console.log('>>>>>> claimTHTSRewards: ', {
      args: [BigInt(project?.epoch), BigInt(userReward.thRewardAcc), BigInt(userReward.tsRewardAcc), userReward.proof]
    })

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
