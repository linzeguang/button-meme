import React, { useCallback, useMemo, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { useForm } from 'react-hook-form'
import { isAddress } from 'viem'
import z from 'zod'

import { Icon, TokenSvgr } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Container, Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogMethods } from '@/components/ui/Dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { RadioGroup, RadioOption } from '@/components/ui/RadioGroup'
import { HarmonyOSSansText } from '@/components/ui/Text'
// import { MIT } from '@/constants/token'
import { TRADE_TYPE, useTrade } from '@/hooks/contracts/useMiningPool'
import { useWallet } from '@/hooks/useWallet'
import { useMemoWithLocale } from '@/hooks/useWithLocale'
import { fromRawAmount } from '@/lib/rawAmount'
import { cn } from '@/lib/utils'
import { useTokenProviderContext } from '@/providers/TokenProvider'

const formSchema = z.object({
  address: z.string()
})

const TradeForm: React.FC = () => {
  const { isConnected, connect } = useWallet()
  const { tokenInfo, tokenUserInfo } = useTokenProviderContext()

  const tradeTypes = useMemoWithLocale<RadioOption[]>(
    () => [
      {
        value: TRADE_TYPE.BUY,
        label: t`Buy`,
        className: 'data-[state=checked]:bg-buy',
        wrapperClassName: 'data-[state=checked]:[&_label]:text-white'
      },
      {
        value: TRADE_TYPE.SELL,
        label: t`Sell`,
        className: 'data-[state=checked]:bg-sell',
        wrapperClassName: 'data-[state=checked]:[&_label]:text-white'
      }
    ],
    []
  )

  const { amountIn, stableTokenBalance, mintTokenBalance, form, tradeType, isLoading, saleEstimate, handleSubmit } =
    useTrade()

  const isInsufficientBalance = useMemo(() => {
    if (tradeType === TRADE_TYPE.BUY) return Number(amountIn) > Number(stableTokenBalance?.formatted)
    return Number(amountIn) > Number(mintTokenBalance?.formatted)
  }, [amountIn, mintTokenBalance?.formatted, stableTokenBalance?.formatted, tradeType])

  const dialogRef = useRef<DialogMethods | null>(null)

  const leaderForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: ''
    }
  })

  const handleLeaderForm = useCallback(async () => {
    if (tokenUserInfo?.lph) {
      await handleSubmit(form.getValues())
    } else {
      dialogRef.current?.open()
    }
  }, [form, handleSubmit, tokenUserInfo?.lph])

  const handleLeaderFormSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      const { address } = values
      if (!isAddress(address)) {
        leaderForm.setError('address', {
          message: 'Invalid address. Please check.'
        })
        return
      }
      form.setValue('leader', address)
      await handleSubmit(form.getValues())
      dialogRef.current?.close()
    },
    [form, handleSubmit, leaderForm]
  )

  return (
    <>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="tradeType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    variant="button"
                    options={tradeTypes}
                    onValueChange={(type) => field.onChange(type as TRADE_TYPE)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="amountIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <HarmonyOSSansText>
                      <Trans>From</Trans>
                    </HarmonyOSSansText>
                    <HarmonyOSSansText>
                      {tradeType === TRADE_TYPE.BUY
                        ? t`Balance: ${stableTokenBalance?.formatted || '--'}`
                        : t`Balance: ${mintTokenBalance?.formatted || '--'}`}
                    </HarmonyOSSansText>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      size="lg"
                      suffixNode={
                        <HarmonyOSSansText className="font-bold">
                          {tradeType === TRADE_TYPE.BUY ? tokenInfo?.stableToken.symbol : tokenInfo?.mintToken.symbol}
                          {/* {tradeType === TRADE_TYPE.BUY ? tokenInfo?.stableToken.symbol : MIT.name} */}
                        </HarmonyOSSansText>
                      }
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amountOut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <HarmonyOSSansText>
                      <Trans>To</Trans>
                    </HarmonyOSSansText>
                    <HarmonyOSSansText>
                      {tradeType === TRADE_TYPE.BUY
                        ? t`LPH: ${tokenUserInfo ? fromRawAmount(tokenUserInfo.lph, 2) : '--'}`
                        : t`Balance: ${stableTokenBalance?.formatted || '--'}`}
                    </HarmonyOSSansText>
                  </FormLabel>
                  <FormControl>
                    <Input
                      size="lg"
                      disabled
                      suffixNode={
                        <HarmonyOSSansText className="font-bold">
                          {/* {tradeType === TRADE_TYPE.BUY ? 'LPH' : tokenInfo?.stableToken.symbol} */}
                          {tradeType === TRADE_TYPE.BUY ? 'LPH' : tokenInfo?.stableToken.symbol}
                        </HarmonyOSSansText>
                      }
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            {tradeType === TRADE_TYPE.SELL && saleEstimate && tokenInfo && (
              <Flex className="justify-between">
                <HarmonyOSSansText>
                  <Trans>
                    receive:{' '}
                    {saleEstimate.myFund ? fromRawAmount(saleEstimate.myFund, tokenInfo.stableToken.decimals) : '--'}
                  </Trans>
                </HarmonyOSSansText>
                <HarmonyOSSansText>
                  <Trans>LPH: {saleEstimate.myLPH ? `+${fromRawAmount(saleEstimate.myLPH, 2)}` : '--'}</Trans>
                </HarmonyOSSansText>
              </Flex>
            )}
            <Button
              variant="primary"
              type="button"
              size="md"
              className="w-full"
              disabled={isConnected ? !amountIn || isInsufficientBalance : false}
              onClick={!isConnected ? connect : handleLeaderForm}
            >
              <span>
                {!isConnected ? (
                  <Trans>Connect Wallet</Trans>
                ) : isInsufficientBalance ? (
                  <Trans>Insufficient Balance</Trans>
                ) : tradeType === TRADE_TYPE.BUY ? (
                  <Trans>Buy Hash & Mint</Trans>
                ) : (
                  <Trans>Sell</Trans>
                )}
              </span>
            </Button>
          </div>
        </form>
      </Form>
      <Dialog
        ref={dialogRef}
        title="Fill in your referral address"
        content={{
          className: 'md:w-[450px]'
        }}
      >
        <Form {...leaderForm}>
          <form onSubmit={leaderForm.handleSubmit(handleLeaderFormSubmit)} className="mt-4 space-y-4">
            <FormField
              control={leaderForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input wrapperClassName="w-full" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Flex className="mt-4 w-full items-center justify-center">
              <Button
                className="min-w-[50%]"
                type="submit"
                size="md"
                variant="primary"
                loading={isLoading}
                disabled={isLoading}
              >
                Comfirm
              </Button>
            </Flex>
          </form>
        </Form>
      </Dialog>
    </>
  )
}

export const Trade: React.FC<{ className?: string; defaultValue?: string }> = (props) => {
  const [value, setValue] = useState(props.defaultValue ?? 'trade')

  return (
    <AccordionRoot type="single" collapsible value={value} onValueChange={setValue} {...props}>
      <TokenAccordionItem
        value="trade"
        triggerClassName="py-0"
        name={
          <>
            <HarmonyOSSansText>
              <Trans>Trade</Trans>
            </HarmonyOSSansText>
            <Flex className="items-center space-x-1">
              <TokenSvgr.Trade className="size-10.5" />
              <Icon.Tip className="text-text-tertiary dark:text-background-fourth" />
            </Flex>
          </>
        }
        content={<TradeForm />}
      />
    </AccordionRoot>
  )
}

export const FooterTrade = () => {
  const scrollToTop = () => {
    document.getElementById('main')?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Container className={cn('flex h-20 items-center space-x-4')}>
      <Button variant="fourth" className="px-1 text-text-primary" onClick={scrollToTop}>
        <Icon.ScrollTop />
      </Button>
      <Dialog
        title={<Trans>Trade</Trans>}
        closeable
        trigger={{
          asChild: true,
          children: (
            <Button variant="primary" className="flex-1">
              <Trans>Trade</Trans>
            </Button>
          )
        }}
      >
        <TradeForm />
      </Dialog>
    </Container>
  )
}
