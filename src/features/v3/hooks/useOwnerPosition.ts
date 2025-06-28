import { useMemo } from 'react'

import { useAccount, useReadContract, useReadContracts } from 'wagmi'

import { NONFUNGIBLE_POSITION_MANAGER } from '@/features/v3/constants'
import { NONFUNGIBLE_POSITION_MANAGER_ABI } from '@/features/v3/constants/abi'

import type { Address } from 'viem'

export const useOwnerPosition = () => {
  const { address } = useAccount()
  const { data: balance } = useReadContract({
    abi: NONFUNGIBLE_POSITION_MANAGER_ABI,
    address: NONFUNGIBLE_POSITION_MANAGER,
    functionName: 'balanceOf',
    args: [address as Address],
    query: {
      enabled: !!address
    }
  })
  const balanceIndexes = useMemo(() => (balance ? Array.from({ length: Number(balance) }, (_, i) => i) : []), [balance])

  const { data: _tokenIds } = useReadContracts({
    contracts: balanceIndexes.map((i) => ({
      abi: NONFUNGIBLE_POSITION_MANAGER_ABI,
      address: NONFUNGIBLE_POSITION_MANAGER,
      functionName: 'tokenOfOwnerByIndex',
      args: [address as Address, BigInt(i)]
    })),
    query: {
      enabled: !!address && !!balanceIndexes.length
    }
  })
  const tokenIds = useMemo(() => (_tokenIds ? _tokenIds.map(({ result }) => result as bigint) : []), [_tokenIds])

  const { data: ownerOf } = useReadContracts({
    contracts: tokenIds.map((tokenId) => ({
      abi: NONFUNGIBLE_POSITION_MANAGER_ABI,
      address: NONFUNGIBLE_POSITION_MANAGER,
      functionName: 'ownerOf',
      args: [tokenId]
    })),
    query: {
      enabled: !!address && !!tokenIds.length
    }
  })
  console.log('>>>>>> ownerOf: ', ownerOf)
  // const { data: positions } = useReadContracts({
  //   contracts: tokenIds
  //     ?.map(
  //       ({ result }) =>
  //         result && {
  //           abi: NONFUNGIBLE_POSITION_MANAGER_ABI,
  //           address: NONFUNGIBLE_POSITION_MANAGER,
  //           functionName: 'positions',
  //           args: [result]
  //         }
  //     )
  //     .filter((contract) => !!contract),
  //   query: {
  //     enabled: !!address && !!tokenIds && !!tokenIds.length
  //   }
  // })
}
