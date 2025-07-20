import { useCallback, useEffect, useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Address } from 'viem'
import { useWriteContract } from 'wagmi'
import z from 'zod'

import { MiningPoolAbi } from '@/constants/abi'
import { useBalance, useTx } from '@/hooks/contracts/useErc20'
import { useSaleEstimate } from '@/hooks/contracts/useInfoContract'
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
  const { tokenInfo } = useTokenProviderContext()

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

  const { approve, transaction, refetchAllowance } = useTx({
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
    buy,
    handleSubmit
  }
}
