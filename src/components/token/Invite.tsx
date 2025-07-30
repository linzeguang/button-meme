import React, { useState } from 'react'

import { Trans } from '@lingui/react/macro'

// import { Socials } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { useTokenProviderContext } from '@/providers/TokenProvider'

const Invite: React.FC<{ className?: string; defaultValue?: string }> = (props) => {
  const [value, setValue] = useState(props.defaultValue ?? 'invite')
  const { tokenUserInfo } = useTokenProviderContext()

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
              <Input wrapperClassName="flex-1" disabled />
              <Button variant="primary" size="sm" className="w-[7rem] xl:min-w-[9.625rem]">
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
