import React, { useCallback, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

// import { Icon } from '@/components/svgr'
import { Grid } from '@/components/ui/Box'
import { Button, ButtonRadio, type ButtonRadioProps } from '@/components/ui/Button'
import { Dialog, type DialogMethods } from '@/components/ui/Dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { Exo2Text } from '@/components/ui/Text'

const quickInputs: ButtonRadioProps['options'] = [
  {
    label: '10%',
    value: 10
  },
  {
    label: '15%',
    value: 15
  },
  {
    label: '50%',
    value: 50
  }
]

const formSchema = z.object({
  mev: z.boolean(),
  slippage: z.number().max(100).min(0)
})

const SlippageDialog: React.FC = () => {
  const dialogRef = useRef<DialogMethods | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mev: false,
      slippage: 15
    }
  })
  const slippage = form.watch('slippage')

  const handleSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    console.log('>>>>>> handleSubmit: values', values)
    // dialogRef.current?.close()
  }, [])

  return (
    <Dialog
      ref={dialogRef}
      title="Set max.slippage(%)"
      trigger={{
        asChild: true,
        children: (
          <Button size="xs" outline>
            {/* <Icon.Slippage /> */}
            <Exo2Text>0.5%</Exo2Text>
          </Button>
        )
      }}
      content={{
        className: 'w-[432px]'
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="mev"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel className="text-base">MEV protection</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slippage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-base">Slippage</FormLabel>
                <ButtonRadio
                  className="grid-cols-3 gap-2"
                  options={quickInputs}
                  value={slippage}
                  onValueChange={field.onChange}
                />
                <FormControl>
                  <Input wrapperClassName="w-full" suffixNode="%" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Grid className="mt-8 grid-cols-2 gap-2">
            <Button type="button" outline className="text-white">
              Reset
            </Button>
            <Button type="submit" variant="primary">
              Comfirm
            </Button>
          </Grid>
        </form>
      </Form>
    </Dialog>
  )
}

export default SlippageDialog
