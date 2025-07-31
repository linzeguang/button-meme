import React, { useMemo, useState } from 'react'

import { Trans } from '@lingui/react/macro'

// import { Socials } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { useWallet } from '@/hooks/useWallet'
import { copy } from '@/lib/utils'
import { useTokenProviderContext } from '@/providers/TokenProvider'

export const inviteKey = 'inviteCode'

const Invite: React.FC<{ className?: string; defaultValue?: string }> = (props) => {
  const { address } = useWallet()
  const [value, setValue] = useState(props.defaultValue ?? 'invite')
  const { tokenUserInfo } = useTokenProviderContext()

  const inviteUrl = useMemo(() => {
    const { href } = window.location
    if (!address) return `{href}`
    return `${href}?${inviteKey}=${address}`
  }, [address])

  return (
    <AccordionRoot type="single" collapsible value={value} onValueChange={setValue} {...props}>
      <TokenAccordionItem
        value="invite"
        name={
          <HarmonyOSSansText>
            <Trans>Invite</Trans>
            {tokenUserInfo?.referencesCount ? `(${tokenUserInfo.referencesCount.toString()})` : ''}
          </HarmonyOSSansText>
        }
        contentClassName="border-none pt-0"
        content={
          <>
            <Flex className="space-x-2">
              <Input wrapperClassName="flex-1" value={inviteUrl} disabled />
              <Button
                variant="primary"
                size="sm"
                className="w-[7rem] xl:min-w-[9.625rem]"
                onClick={() => copy(inviteUrl)}
              >
                <Trans>Copy</Trans>
              </Button>
            </Flex>
            {/* <Flex className="space-x-2 [&_svg]:h-4.5">
              <Socials.Facebook />
              <Socials.Telegram />
              <Socials.Twitter />
              <Socials.WhatsApp />
              <Socials.YouTube />
            </Flex> */}
          </>
        }
      />
    </AccordionRoot>
  )
}

export default Invite
