import React, { useState } from 'react'

import { Socials } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { HarmonyOSSansText } from '@/components/ui/Text'

const Invite: React.FC<{ className?: string; defaultValue?: string }> = (props) => {
  const [value, setValue] = useState(props.defaultValue ?? 'invite')

  return (
    <AccordionRoot type="single" collapsible value={value} onValueChange={setValue} {...props}>
      <TokenAccordionItem
        value="invite"
        name={<HarmonyOSSansText>Invite Friends</HarmonyOSSansText>}
        content={
          <>
            <Flex className="gap-2">
              <Input wrapperClassName="flex-1" disabled />
              <Button variant="primary" size="sm" className="min-w-[6rem]">
                Copy
              </Button>
            </Flex>
            <Flex className="gap-2 [&_svg]:h-4.5">
              <Socials.Facebook />
              <Socials.Telegram />
              <Socials.Twitter />
              <Socials.WhatsApp />
              <Socials.YouTube />
            </Flex>
          </>
        }
      />
    </AccordionRoot>
  )
}

export default Invite
