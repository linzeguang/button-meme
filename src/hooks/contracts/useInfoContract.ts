import { useEffect, useMemo } from 'react'

import { useSetAtom } from 'jotai/react'
import { Address, erc20Abi } from 'viem'
import { useAccount, useReadContract, useReadContracts } from 'wagmi'

import { InfoAbi } from '@/constants/abi'
import { ENV_PARAMS } from '@/constants/evnParams'
import { Project, TokenInfo, TokenUserInfo } from '@/hooks/contracts/types'
import { projectsAtom } from '@/stores/token'

export const useProjects = () => {
  const setProjects = useSetAtom(projectsAtom)

  const { data: count } = useReadContract({
    abi: InfoAbi,
    address: ENV_PARAMS.INFO_CONTRACT,
    functionName: 'getProjectCount'
  })
  const { data } = useReadContracts({
    contracts: Array.from({ length: Number(count) }, (_, index) => ({
      abi: InfoAbi,
      address: ENV_PARAMS.INFO_CONTRACT,
      functionName: 'getProjectInfo',
      args: [BigInt(index)]
    }))
  })

  const projects = useMemo(
    () =>
      data?.map<Project>(({ result }, index) => {
        const [name, epoch] = result as unknown as [string, number]
        return {
          name,
          epoch,
          id: index
        }
      }),
    [data]
  )

  useEffect(() => {
    setProjects(projects || [])
  }, [projects, setProjects])
}

export const useTokenBaseInfo = (id: number) => {
  const { data } = useReadContract({
    abi: InfoAbi,
    address: ENV_PARAMS.INFO_CONTRACT,
    functionName: 'getBaseInfo',
    args: [BigInt(id)]
  })

  const mintToken = useMemo(() => data?.[2], [data])

  const { data: mintTokenInfo } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: mintToken,
        functionName: 'name'
      },
      {
        abi: erc20Abi,
        address: mintToken,
        functionName: 'symbol'
      },
      {
        abi: erc20Abi,
        address: mintToken,
        functionName: 'decimals'
      },
      {
        abi: erc20Abi,
        address: mintToken,
        functionName: 'balanceOf',
        args: [ENV_PARAMS.BURN_CONTRACT]
      }
    ]
  })

  return useMemo<TokenInfo | undefined>(() => {
    if (!data) return undefined
    if (!mintTokenInfo) return undefined
    const [
      miningPool,
      stableToken,
      mintToken,
      checkMerkleRoot,
      epochReleaseRate,
      startBlock,
      totalLPH,
      userRewardsAcc,
      thRewardsAcc,
      tsRewardsAcc
    ] = data
    const [{ result: name }, { result: symbol }, { result: decimals }, { result: burnedAmount }] = mintTokenInfo

    return {
      miningPool,
      stableToken,
      checkMerkleRoot,
      epochReleaseRate,
      startBlock,
      totalLPH,
      userRewardsAcc,
      thRewardsAcc,
      tsRewardsAcc,
      mintToken: {
        address: mintToken,
        name,
        symbol,
        decimals,
        burnedAmount
      }
    }
  }, [data, mintTokenInfo])
}

export const useTokenUserInfo = (id: number) => {
  const { address } = useAccount()

  const { data } = useReadContract({
    abi: InfoAbi,
    address: ENV_PARAMS.INFO_CONTRACT,
    functionName: 'getUserInfo',
    args: [BigInt(id), address as Address]
  })

  return useMemo<TokenUserInfo | undefined>(() => {
    if (!data) return undefined
    const [investedAcc, lph, lphRewardPending, claimedRewardsLPH, claimedRewardsTH, claimedRewardsTS, referencesCount] =
      data

    return {
      investedAcc,
      lph,
      lphRewardPending,
      claimedRewardsLPH,
      claimedRewardsTH,
      claimedRewardsTS,
      referencesCount
    }
  }, [data])
}

export const useSaleEstimate = (id: bigint, amountIn: bigint) => {
  const { data } = useReadContract({
    abi: InfoAbi,
    address: ENV_PARAMS.INFO_CONTRACT,
    functionName: 'saleEstimate',
    args: [id, amountIn]
  })

  return useMemo(() => {
    if (!data) return undefined
    const [totalFund, myFund, myLPH] = data

    return {
      totalFund,
      myFund,
      myLPH
    }
  }, [data])
}
