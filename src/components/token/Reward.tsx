import React, { useState } from 'react'

import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { HarmonyOSSansText } from '@/components/ui/Text'

const Reward: React.FC<{ className?: string; defaultValue?: string }> = (props) => {
  const [value, setValue] = useState(props.defaultValue ?? 'reward')

  return (
    <AccordionRoot type="single" value={value} onValueChange={setValue} {...props}>
      <TokenAccordionItem
        value="reward"
        name={<HarmonyOSSansText>Reward</HarmonyOSSansText>}
        contentClassName="border-none pt-0"
        content={
          <Flex className="items-center justify-between">
            <HarmonyOSSansText as="div" variant="primary" className="flex flex-col gap-1">
              <span className="text-primary text-2xl font-bold">28888.88</span>
              <HarmonyOSSansText variant="secondary" className="flex gap-4 text-sm">
                <span>/ Total</span>
                <span>2565363.36</span>
              </HarmonyOSSansText>
            </HarmonyOSSansText>
            <Button variant="primary" className="min-w-[10rem]">
              Claim
            </Button>
          </Flex>
        }
      />
    </AccordionRoot>
  )
}

export default Reward
