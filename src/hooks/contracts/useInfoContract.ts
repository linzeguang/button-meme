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
    chainId: ENV_PARAMS.CHAIN_ID,
    address: ENV_PARAMS.INFO_CONTRACT,
    functionName: 'getProjectCount'
  })
  const { data } = useReadContracts({
    contracts: Array.from({ length: Number(count) }, (_, index) => ({
      abi: InfoAbi,
      chainId: ENV_PARAMS.CHAIN_ID,
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

export const useTokenBaseInfo = (project?: Project) => {
  const { data } = useReadContract({
    abi: InfoAbi,
    chainId: ENV_PARAMS.CHAIN_ID,
    address: ENV_PARAMS.INFO_CONTRACT,
    functionName: 'getBaseInfo',
    args: project && [BigInt(project.id)],
    query: {
      enabled: !!project
    }
  })

  const [stableToken, mintToken] = useMemo(() => [data?.[1], data?.[2]], [data])

  const { data: info } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        chainId: ENV_PARAMS.CHAIN_ID,
        address: stableToken,
        functionName: 'name'
      },
      {
        abi: erc20Abi,
        chainId: ENV_PARAMS.CHAIN_ID,
        address: stableToken,
        functionName: 'symbol'
      },
      {
        abi: erc20Abi,
        chainId: ENV_PARAMS.CHAIN_ID,
        address: stableToken,
        functionName: 'decimals'
      },
      {
        abi: erc20Abi,
        chainId: ENV_PARAMS.CHAIN_ID,
        address: mintToken,
        functionName: 'name'
      },
      {
        abi: erc20Abi,
        chainId: ENV_PARAMS.CHAIN_ID,
        address: mintToken,
        functionName: 'symbol'
      },
      {
        abi: erc20Abi,
        chainId: ENV_PARAMS.CHAIN_ID,
        address: mintToken,
        functionName: 'decimals'
      },
      {
        abi: erc20Abi,
        chainId: ENV_PARAMS.CHAIN_ID,
        address: mintToken,
        functionName: 'balanceOf',
        args: [ENV_PARAMS.BURN_CONTRACT]
      }
    ]
  })

  return useMemo<TokenInfo | undefined>(() => {
    if (!data) return undefined
    if (!info) return undefined
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
    const [
      { result: stableTokenName },
      { result: stableTokenSymbol },
      { result: stableTokenDecimals },
      { result: mintTokenName },
      { result: mintTokenSymbol },
      { result: mintTokenDecimals },
      { result: mintTokenBurnedAmount }
    ] = info

    return {
      miningPool,
      checkMerkleRoot,
      epochReleaseRate,
      startBlock,
      totalLPH,
      userRewardsAcc,
      thRewardsAcc,
      tsRewardsAcc,
      mintToken: {
        address: mintToken,
        name: mintTokenName!,
        symbol: mintTokenSymbol!,
        decimals: mintTokenDecimals!,
        burnedAmount: mintTokenBurnedAmount!
      },
      stableToken: {
        address: stableToken,
        name: stableTokenName!,
        symbol: stableTokenSymbol!,
        decimals: stableTokenDecimals!
      },
      project: project!
    }
  }, [data, info, project])
}

export const useTokenUserInfo = (project?: Project) => {
  const { address } = useAccount()

  const { data } = useReadContract({
    abi: InfoAbi,
    chainId: ENV_PARAMS.CHAIN_ID,
    address: ENV_PARAMS.INFO_CONTRACT,
    functionName: 'getUserInfo',
    args: project && [BigInt(project.id), address as Address],
    query: {
      enabled: !!project
    }
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

export const useSaleEstimate = (params?: { id: number; amountIn: bigint }) => {
  const { data } = useReadContract({
    abi: InfoAbi,
    chainId: ENV_PARAMS.CHAIN_ID,
    address: ENV_PARAMS.INFO_CONTRACT,
    functionName: 'saleEstimate',
    args: params && [BigInt(params.id), params.amountIn],
    query: {
      enabled: !!params
    }
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
