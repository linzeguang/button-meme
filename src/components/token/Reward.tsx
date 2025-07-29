import React, { useCallback, useState } from 'react'

import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'

import { TokenSvgr } from '@/components/svgr'
import TokenAccordionItem from '@/components/token/TokenAccordionItem'
import { AccordionRoot } from '@/components/ui/Accordion'
import { Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { HarmonyOSSansText } from '@/components/ui/Text'
import { useClaim } from '@/hooks/contracts/useMiningPool'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useMemoWithLocale } from '@/hooks/useWithLocale'
import Calculator from '@/lib/calculator'
import { fromRawAmount } from '@/lib/rawAmount'
import { cn } from '@/lib/utils'
import { useTokenProviderContext } from '@/providers/TokenProvider'

enum TAB_TYPE {
  Distribute,
  Reward
}

const Reward: React.FC<{ className?: string; defaultValue?: string }> = (props) => {
  const { isMobile } = useMediaQuery()
  const [value, setValue] = useState(props.defaultValue ?? 'reward')
  const [tabType, setTabType] = useState<TAB_TYPE>(TAB_TYPE.Distribute)

  const { tokenInfo, tokenUserInfo, userReward } = useTokenProviderContext()

  const tabTypes = useMemoWithLocale(
    () => [
      {
        name: t`矿车分配`,
        value: TAB_TYPE.Distribute
      },
      {
        name: t`矿车奖励`,
        value: TAB_TYPE.Reward
      }
    ],
    []
  )

  const tabData = useMemoWithLocale(() => {
    return tabType === TAB_TYPE.Distribute
      ? tokenUserInfo && tokenInfo
        ? {
            value: fromRawAmount(tokenUserInfo.lphRewardPending, tokenInfo.mintToken.decimals),
            total: fromRawAmount(
              Calculator.base(tokenUserInfo.lphRewardPending.toString())
                .add(tokenUserInfo.claimedRewardsLPH.toString())
                .toBigint(),
              tokenInfo.mintToken.decimals
            )
          }
        : undefined
      : userReward && tokenInfo
        ? {
            // thReward + tsReward
            value: fromRawAmount(
              Calculator.base(userReward.thReward).add(userReward.tsReward).toBigint(),
              tokenInfo.mintToken.decimals
            ),
            // thRewardAcc + tsRewardAcc
            total: fromRawAmount(
              Calculator.base(userReward.thRewardAcc).add(userReward.tsRewardAcc).toBigint(),
              tokenInfo.mintToken.decimals
            )
          }
        : undefined
  }, [tabType])

  const { claimLPHRewards, claimTHTSRewards, isLoading } = useClaim()

  const handleCliam = useCallback(() => {
    if (tabType === TAB_TYPE.Distribute) {
      claimTHTSRewards()
    } else {
      claimLPHRewards()
    }
  }, [claimLPHRewards, claimTHTSRewards, tabType])

  return (
    <AccordionRoot type="single" value={value} onValueChange={setValue} {...props}>
      <TokenAccordionItem
        value="reward"
        triggerClassName="pt-0"
        name={
          <Flex className="gap-0.5">
            {tabTypes.map((type) => (
              <div
                key={type.value}
                className={cn(
                  'cursor-pointer px-4 py-2.5 transition-all',
                  'border-background-unactive border-b-2',
                  tabType === type.value && 'text-primary border-primary'
                )}
                onClick={() => setTabType(type.value)}
              >
                {type.name}
              </div>
            ))}
          </Flex>
        }
        contentClassName="border-none pt-0"
        content={
          <Flex className="items-center justify-between">
            <HarmonyOSSansText as="div" variant="primary" className="flex flex-col gap-1">
              <span className="text-primary text-lg font-bold lg:text-2xl">{tabData ? tabData.value : '--'}</span>
              <HarmonyOSSansText variant="secondary" className="flex gap-4 text-xs lg:text-sm">
                <span>
                  <Trans>/ Total</Trans>
                </span>
                <span>{tabData ? tabData.total : '--'}</span>
              </HarmonyOSSansText>
            </HarmonyOSSansText>
            <Button
              variant="primary"
              size={isMobile ? 'sm' : 'md'}
              loading={isLoading}
              disabled={tokenInfo?.checkMerkleRoot || isLoading}
              className="w-[7rem] xl:min-w-[9.625rem]"
              onClick={handleCliam}
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
