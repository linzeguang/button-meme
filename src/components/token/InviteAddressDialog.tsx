import React, { useCallback, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { isAddress } from 'viem'
import z from 'zod'

import { Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Dialog, type DialogMethods } from '@/components/ui/Dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'

const formSchema = z.object({
  address: z.string()
})

const InviteAddressDialog: React.FC = () => {
  const dialogRef = useRef<DialogMethods | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: ''
    }
  })

  const handleSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      console.log('>>>>>> handleSubmit: values', values)
      const { address } = values
      if (!isAddress(address)) {
        form.setError('address', {
          message: 'Invalid address. Please check.'
        })
        return
      }

      dialogRef.current?.close()
    },
    [form]
  )

  return (
    <Dialog
      ref={dialogRef}
      title="Fill in your referral address"
      content={{
        className: 'w-[450px]'
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-4 space-y-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input wrapperClassName="w-full" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Flex className="mt-4 items-center justify-center">
            <Button type="submit" size="sm" variant="primary">
              Comfirm
            </Button>
          </Flex>
        </form>
      </Form>
    </Dialog>
  )
}

export default InviteAddressDialog
