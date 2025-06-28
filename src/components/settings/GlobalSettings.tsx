import React, { useCallback, useEffect, useRef } from 'react'

import { Icon } from '@/components/svgr'
import { Flex } from '@/components/ui/Box'
import { Button, SelectorButton } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Dividing } from '@/components/ui/Dividing'
import { Input } from '@/components/ui/Input'
import { FunnelDisplayText } from '@/components/ui/Text'
import { RPCEndpoint, SUPPORT_RPC_ENDPOINT } from '@/constants/settings'
import { useRpcEndpoint } from '@/hooks/useRpcEndpoint'
import { cn } from '@/lib/utils'

const GlobalSettings: React.FC = () => {
  const { rpcEndpointKey, rpcUrl, setRpcUrl, setRpcEndpointKey } = useRpcEndpoint()

  const rpcInputRef = useRef<React.ComponentRef<typeof Input>>(null)

  const handleCustomRpc = useCallback(
    (value: string) => {
      setRpcUrl(value)
    },
    [setRpcUrl]
  )

  useEffect(() => {
    if (rpcEndpointKey === RPCEndpoint.Custom) rpcInputRef.current?.focus()
  }, [rpcEndpointKey])

  return (
    <Dialog
      title="Settings"
      trigger={{
        asChild: true,
        children: (
          <Button className="text-text-icon w-10 rounded-full">
            <Icon.Settings />
          </Button>
        )
      }}
      content={{
        className: 'space-y-2 min-w-[312px]'
      }}
    >
      <Flex className="items-center justify-between">
        <FunnelDisplayText variant="secondary" className="text-sm">
          Preferred Explorer
        </FunnelDisplayText>
        <SelectorButton className="min-w-30 justify-between">Solscan</SelectorButton>
      </Flex>
      <Dividing />
      <div className="space-y-2.5">
        <FunnelDisplayText as="div" variant="secondary" className="text-sm">
          RPC Endpoint
        </FunnelDisplayText>
        <Flex className="gap-2">
          {SUPPORT_RPC_ENDPOINT.map(({ key, name, url }) => (
            <Button
              key={key}
              size="xs"
              shadow={false}
              ghost={key !== rpcEndpointKey}
              variant="secondary"
              className={cn(
                key === rpcEndpointKey
                  ? 'text-primary border-primary'
                  : 'border-text-secondary hover:text-primary hover:border-primary'
              )}
              onClick={() => {
                setRpcEndpointKey(key)
                setRpcUrl(url)
              }}
            >
              {name}
            </Button>
          ))}
        </Flex>
        <Input
          ref={rpcInputRef}
          placeholder="Custom RPC URL"
          suffixNode={
            <Button variant="primary" shadow={false} size="sm">
              Save
            </Button>
          }
          readOnly={rpcEndpointKey !== RPCEndpoint.Custom}
          value={rpcUrl}
          onChange={(ev) => handleCustomRpc(ev.target.value)}
        />
      </div>
    </Dialog>
  )
}

export default GlobalSettings
