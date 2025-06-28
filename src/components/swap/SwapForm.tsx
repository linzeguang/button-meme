import React, { useCallback, useState } from 'react'

import { Percent } from '@uniswap/sdk-core'
import { FeeAmount, NonfungiblePositionManager } from '@uniswap/v3-sdk'
import { erc721Abi, type Address } from 'viem'
import { useAccount, useBalance, useReadContract, useReadContracts, useSendTransaction } from 'wagmi'

import SlippageDialog from '@/components/settings/SlippageDialog'
import { Icon } from '@/components/svgr'
import { Flex } from '@/components/ui/Box'
import { Button } from '@/components/ui/Button'
import { Exo2Text, UnboundedText } from '@/components/ui/Text'
import { Tokens } from '@/features/constants'
import { NONFUNGIBLE_POSITION_MANAGER } from '@/features/v3/constants'
import { NONFUNGIBLE_POSITION_MANAGER_ABI } from '@/features/v3/constants/abi'
import { useOwnerPosition } from '@/features/v3/hooks/useOwnerPosition'
import { V3 } from '@/features/v3/utils/v3'
import { formatNumber } from '@/lib/format'

const tokens = [Tokens.AAA, Tokens.BBB, Tokens.CCC, Tokens.DDD]

const v3 = new V3()

const SwapForm: React.FC = () => {
  const { address } = useAccount()
  const balance = useBalance({
    address
  })
  const [tokenIn, setTokenIn] = useState(tokens[0])
  const [tokenOut, setTokenOut] = useState(tokens[1])

  const { sendTransaction } = useSendTransaction()
  useOwnerPosition()

  const create = () => {
    if (!address) return

    const slippageTolerance = new Percent(50, 100)
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10
    const [tokenA, tokenB] = tokenIn.sortsBefore(tokenOut) ? [tokenIn, tokenOut] : [tokenOut, tokenIn]
    const { calldata, value } = v3.createPool(address, {
      tokenA,
      tokenB,
      fee: FeeAmount.LOW,
      price: 3,
      slippageTolerance,
      deadline
    })

    sendTransaction({
      to: NONFUNGIBLE_POSITION_MANAGER,
      data: calldata as `0x${string}`,
      value: BigInt(value)
    })
  }

  const increase = useCallback(() => {
    if (!address) return
  }, [])

  return (
    <div className="mx-auto w-[558px]">
      <Flex className="items-center justify-between">
        <UnboundedText className="text-2xl font-black">Swap</UnboundedText>
        <Flex className="gap-2">
          <Button size="xs" outline>
            <Icon.Wallet />
            <Exo2Text>{formatNumber(balance.data?.formatted || 0, 3)}</Exo2Text>
          </Button>
          <SlippageDialog />
        </Flex>
      </Flex>
      <div className="space-y-2">
        <Flex className="gap-2">
          {tokens.map((token) => (
            <Button
              key={token.address}
              variant={tokenIn.address === token.address ? 'primary' : 'default'}
              onClick={() => setTokenIn(token)}
              disabled={token.address === tokenOut.address}
            >
              {token.name}
            </Button>
          ))}
        </Flex>
        <Flex className="gap-2">
          {tokens.map((token) => (
            <Button
              key={token.address}
              variant={tokenOut.address === token.address ? 'primary' : 'default'}
              onClick={() => setTokenOut(token)}
              disabled={token.address === tokenIn.address}
            >
              {token.name}
            </Button>
          ))}
        </Flex>

        <Button variant="primary" onClick={create}>
          createPool
        </Button>
      </div>
    </div>
  )
}

export default SwapForm
