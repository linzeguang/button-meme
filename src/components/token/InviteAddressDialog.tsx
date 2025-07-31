import React, { useCallback, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Address, isAddress } from 'viem'
import z from 'zod'

import { Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Dialog, type DialogMethods } from '@/components/ui/Dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'

const formSchema = z.object({
  address: z.string()
})

const InviteAddressDialog: React.FC<{ onSubmit: (leader: Address) => void }> = ({ onSubmit }) => {

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
      onSubmit(address)
      dialogRef.current?.close()
    },
    [form, onSubmit]
  )

  return (

  )
}

export default InviteAddressDialog
