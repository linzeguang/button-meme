import React, { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Icon } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { HarmonyOSSansText } from '@/components/ui/Text'

export enum TRADE_TYPE {
  BUY = 'buy',
  SELL = 'sell'
}

const formSchema = z.object({
  tradeType: z.enum([TRADE_TYPE.BUY, TRADE_TYPE.SELL]),
  amountIn: z.string(),
  amountOut: z.string()
})

export const Trade: React.FC<{ className?: string; defaultValue?: string }> = (props) => {
  const [value, setValue] = useState(props.defaultValue ?? 'trade')

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
    <AccordionRoot type="single" collapsible value={value} onValueChange={setValue} {...props}>
      <TokenAccordionItem
        value="trade"
        name={
          <>
            <HarmonyOSSansText>Trade</HarmonyOSSansText>
            <Icon.Tip className="text-text-secondary" />
          </>
        }
        content={
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
        }
      />
    </AccordionRoot>
  )
}

export default Trade
