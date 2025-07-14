import React, { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Icon } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Container } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { cn } from '@/lib/utils'

export enum TRADE_TYPE {
  BUY = 'buy',
  SELL = 'sell'
}

const formSchema = z.object({
  tradeType: z.enum([TRADE_TYPE.BUY, TRADE_TYPE.SELL]),
  amountIn: z.string(),
  amountOut: z.string()
})

const TradeForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tradeType: TRADE_TYPE.BUY,
      amountIn: '',
      amountOut: ''
    }
  })

  const handleSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    console.log('>>>>>> handleSubmit: values', values)
    // dialogRef.current?.close()
  }, [])

  return (
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
                  options={[
                    {
                      value: TRADE_TYPE.BUY,
                      label: 'Buy',
                      className: 'data-[state=checked]:bg-buy'
                    },
                    {
                      value: TRADE_TYPE.SELL,
                      label: 'Sell',
                      className: 'data-[state=checked]:bg-sell'
                    }
                  ]}
                  onValueChange={(type) => field.onChange(type as TRADE_TYPE)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="space-y-2.5">
          <FormField
            control={form.control}
            name="amountIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  <HarmonyOSSansText>Amount</HarmonyOSSansText>
                  <HarmonyOSSansText>balance</HarmonyOSSansText>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <HarmonyOSSansText>Amount</HarmonyOSSansText>
                  <HarmonyOSSansText>balance</HarmonyOSSansText>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button variant="primary" type="submit" size="sm" className="w-full">
          Buy Hash & Mint
        </Button>
      </form>
    </Form>
  )
}

export const Trade: React.FC<{ className?: string; defaultValue?: string }> = (props) => {
  const [value, setValue] = useState(props.defaultValue ?? 'trade')

  return (
    <AccordionRoot type="single" collapsible value={value} onValueChange={setValue} {...props}>
      <TokenAccordionItem
        value="trade"
        name={
          <>
            <HarmonyOSSansText>Trade</HarmonyOSSansText>
            <Icon.Tip className="text-text-secondary" />
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
        title="Trade"
        closeable
        trigger={{
          asChild: true,
          children: (
            <Button variant="primary" className="flex-1">
              Trade
            </Button>
          )
        }}
      >
        <TradeForm />
      </Dialog>
    </Container>
  )
}
