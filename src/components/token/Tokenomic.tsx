import React, { useState } from 'react'

import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { ResponsivePie } from '@nivo/pie'

import { Icon } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex, Grid } from '@/components/ui/Box'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { useMemoWithLocale } from '@/hooks/useWithLocale'
import { randomColor } from '@/lib/utils'

const COLOR = {
  LPHMining: randomColor(),
  THRewards: randomColor(),
  TSRewards: randomColor(),
  Defi: randomColor()
}

const Tokenomic: React.FC<{ className?: string; defaultValue?: string }> = (props) => {
  const [value, setValue] = useState(props.defaultValue ?? 'tokenomic')

  const data = useMemoWithLocale(
    () => [
      {
        id: 'LPHMining',
        label: t`LPH Mining`,
        value: 65
      },
      {
        id: 'THRewards',
        label: t`TH Rewards`,
        value: 20
      },
      {
        id: 'TSRewards',
        label: t`TS Rewards`,
        value: 10
      },
      {
        id: 'Defi',
        label: t`Defi`,
        value: 5
      }
    ],
    []
  )

  return (
    <AccordionRoot type="single" collapsible value={value} onValueChange={setValue} {...props}>
      <TokenAccordionItem
        value="tokenomic"
        name={
          <>
            <HarmonyOSSansText>
              <Trans>Tokenomic</Trans>
            </HarmonyOSSansText>
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
            <Flex className="justify-center">
              <Grid className="grid-cols-2 gap-x-3 gap-y-0.5">
                {data.map(({ id, label }) => (
                  <HarmonyOSSansText as="div" key={id} className="flex items-center gap-1 text-xs" variant="secondary">
                    <div className="size-2" style={{ backgroundColor: COLOR[id as keyof typeof COLOR] }} />
                    <span>{label}</span>
                  </HarmonyOSSansText>
                ))}
              </Grid>
            </Flex>
          </>
        }
      />
    </AccordionRoot>
  )
}

export default Tokenomic
