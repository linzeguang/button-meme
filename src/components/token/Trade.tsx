import React, { useState } from 'react'

import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'

import { Icon, TokenSvgr } from '@/components/svgr'
import InviteAddressDialog from '@/components/token/InviteAddressDialog'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Container, Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { RadioGroup, RadioOption } from '@/components/ui/RadioGroup'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { TRADE_TYPE, useTrade } from '@/hooks/contracts/useMiningPool'
import { useMemoWithLocale } from '@/hooks/useWithLocale'
import { cn } from '@/lib/utils'
import { useTokenProviderContext } from '@/providers/TokenProvider'

const TradeForm: React.FC = () => {
  const { tokenInfo, tokenUserInfo } = useTokenProviderContext()

  const { stableTokenBalance, mintTokenBalance, form, tradeType, handleSubmit } = useTrade()

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
                      size="lg"
                      suffixNode={
                        <HarmonyOSSansText className="font-bold">
                          {tradeType === TRADE_TYPE.BUY ? tokenInfo?.stableToken.symbol : tokenInfo?.mintToken.symbol}
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
                        ? t`LPH: ${tokenUserInfo?.lph.toString() ?? '--'}`
                        : t`Balance: ${stableTokenBalance?.formatted || '--'}`}
                    </HarmonyOSSansText>
                  </FormLabel>
                  <FormControl>
                    <Input
                      size="lg"
                      readOnly
                      suffixNode={
                        <HarmonyOSSansText className="font-bold">
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
          <Button variant="primary" type="submit" size="md" className="w-full">
            <Trans>Buy Hash & Mint</Trans>
          </Button>
        </form>
      </Form>
      <InviteAddressDialog />
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
            <Flex className="items-center gap-1">
              <TokenSvgr.Trade className="size-10.5" />
              <Icon.Tip className="text-background-fourth light:text-text-tertiary" />
            </Flex>
          </>
        }
        content={<TradeForm />}
      />
    </AccordionRoot>
  )
}

export const FooterTrade = () => {
  return (
    <Container className={cn('flex h-20 items-center gap-4')}>
      <Button variant="fourth" className="text-text-primary px-1">
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
