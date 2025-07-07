import React, { useState } from 'react'

import { Icon } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { HarmonyOSSansText } from '@/components/ui/Text'

export enum TRADE_TYPE {
  BUY = 'buy',
  SELL = 'sell'
}

export const Trade: React.FC<{ className?: string; defaultValue?: string }> = (props) => {
  const [value, setValue] = useState(props.defaultValue ?? 'trade')
  const [tradeType, setTradeType] = useState(TRADE_TYPE.BUY)

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
          <form>
            <RadioGroup
              value={tradeType}
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
              onValueChange={(type) => setTradeType(type as TRADE_TYPE)}
            />
          </form>
        }
      />
    </AccordionRoot>
  )
}

export default Trade
