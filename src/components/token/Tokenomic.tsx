import React, { useState } from 'react'

import { ResponsivePie } from '@nivo/pie'

import { Icon } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { HarmonyOSSansText } from '@/components/ui/Text'

const data = [
  {
    id: 'presalc',
    label: 'Presalc',
    value: 40
  },
  {
    id: 'liquidity',
    label: 'Liquidity',
    value: 30
  },
  {
    id: 'burnt',
    label: 'Burnt',
    value: 20
  }
]

const Tokenomic: React.FC<{ className?: string; defaultValue?: string }> = (props) => {
  const [value, setValue] = useState(props.defaultValue ?? 'tokenomic')

  return (
    <AccordionRoot type="single" collapsible value={value} onValueChange={setValue} {...props}>
      <TokenAccordionItem
        value="tokenomic"
        name={
          <>
            <HarmonyOSSansText>Tokenomic</HarmonyOSSansText>
            <Icon.Tip className="text-text-secondary" />
          </>
        }
        content={
          <div className="mx-auto aspect-square w-4/5 max-w-64">
            <ResponsivePie /* or Pie for fixed dimensions */
              data={data}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              innerRadius={0.7}
              padAngle={0.6}
              enableArcLabels={false}
              enableArcLinkLabels={false}
              isInteractive={false}
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  translateY: 20,
                  itemWidth: 56,
                  itemHeight: 10,
                  itemsSpacing: 12,
                  symbolSize: 10,
                  itemTextColor: '#fff'
                }
              ]}
            />
          </div>
        }
      />
    </AccordionRoot>
  )
}

export default Tokenomic
