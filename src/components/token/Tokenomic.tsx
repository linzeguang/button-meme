import React, { useState } from 'react'

import { ResponsivePie } from '@nivo/pie'

import { Icon } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Grid } from '@/components/ui/Box'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { randomColor } from '@/lib/utils'

const COLOR = {
  LPHMining: randomColor(),
  THRewards: randomColor(),
  TSRewards: randomColor(),
  Defi: randomColor()
}

const data = [
  {
    id: 'LPHMining',
    label: 'LPH Mining',
    value: 65
  },
  {
    id: 'THRewards',
    label: 'TH Rewards',
    value: 20
  },
  {
    id: 'TSRewards',
    label: 'TS Rewards',
    value: 10
  },
  {
    id: 'Defi',
    label: 'Defi',
    value: 5
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
          <>
            <div className="mx-auto aspect-square w-4/5 max-w-64">
              <ResponsivePie /* or Pie for fixed dimensions */
                data={data}
                colors={(d) => COLOR[d.id as keyof typeof COLOR]}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.7}
                padAngle={0.6}
                enableArcLabels={false}
                enableArcLinkLabels={false}
                isInteractive={false}
                legends={[]}
              />
            </div>
            <Grid className="mx-auto w-4/5 max-w-64 grid-cols-2 gap-0.5">
              {data.map(({ id, label }) => (
                <HarmonyOSSansText as="div" key={id} className="flex items-center gap-1 text-xs" variant="secondary">
                  <div className="size-2" style={{ backgroundColor: COLOR[id as keyof typeof COLOR] }} />
                  <span>{label}</span>
                </HarmonyOSSansText>
              ))}
            </Grid>
          </>
        }
      />
    </AccordionRoot>
  )
}

export default Tokenomic
