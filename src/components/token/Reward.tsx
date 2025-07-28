import React, { useState } from 'react'

import { Trans } from '@lingui/react/macro'

import { TokenSvgr } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { HarmonyOSSansText } from '@/components/ui/Text'
import useMediaQuery from '@/hooks/useMediaQuery'
import Calculator from '@/lib/calculator'
import { fromRawAmount } from '@/lib/rawAmount'
import { useTokenProviderContext } from '@/providers/TokenProvider'

const Reward: React.FC<{ className?: string; defaultValue?: string }> = (props) => {
  const { isMobile } = useMediaQuery()
  const [value, setValue] = useState(props.defaultValue ?? 'reward')

  const { tokenInfo, tokenUserInfo } = useTokenProviderContext()

  return (
    <AccordionRoot type="single" value={value} onValueChange={setValue} {...props}>
      <TokenAccordionItem
        value="reward"
        name={
          <HarmonyOSSansText>
            <Trans>Reward</Trans>
          </HarmonyOSSansText>
        }
        contentClassName="border-none pt-0"
        content={
          <Flex className="items-center justify-between">
            <HarmonyOSSansText as="div" variant="primary" className="flex flex-col gap-1">
              <span className="text-primary text-lg font-bold lg:text-2xl">
                {tokenUserInfo && tokenInfo
                  ? fromRawAmount(tokenUserInfo.lphRewardPending, tokenInfo.mintToken.decimals)
                  : '--'}
              </span>
              <HarmonyOSSansText variant="secondary" className="flex gap-4 text-xs lg:text-sm">
                <span>
                  <Trans>/ Total</Trans>
                </span>
                <span>
                  {tokenUserInfo && tokenInfo
                    ? fromRawAmount(
                        Calculator.base(tokenUserInfo.lphRewardPending.toString())
                          .add(tokenUserInfo?.claimedRewardsLPH.toString())
                          .toBigint(),
                        tokenInfo.mintToken.decimals
                      )
                    : '--'}
                </span>
              </HarmonyOSSansText>
            </HarmonyOSSansText>
            <Button
              variant="primary"
              size={isMobile ? 'sm' : 'md'}
              disabled={tokenInfo?.checkMerkleRoot}
              className="xl:min-w-[6rem]"
            >
              <Trans>Claim</Trans>
            </Button>
          </Flex>
        }
        wrapperClassName="relative"
        suffixNode={<TokenSvgr.Reward className="absolute top-0 right-0 bottom-0 z-[-1]" />}
      />
    </AccordionRoot>
  )
}

export default Reward
