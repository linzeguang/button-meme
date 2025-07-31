import { atomWithStorage } from 'jotai/utils'

import { STORAGE_KEY } from '@/constants/storages'
import { DEFAULT_RESOLUTIONS } from '@/constants/tradingiew'
import { Project, TokenInfo } from '@/hooks/contracts/types'
import { Reward } from '@/hooks/services/useReward'
import { bigintSafeStorage } from '@/stores/token.utils'
import { ResolutionString } from 'public/charting_library/charting_library'

export const intervalAtom = atomWithStorage<ResolutionString>(STORAGE_KEY.INTERVAL, DEFAULT_RESOLUTIONS, undefined, {
  getOnInit: true
})

export const projectsAtom = atomWithStorage<Project[]>(STORAGE_KEY.PROJECTS, [], undefined, { getOnInit: true })

export const tokenInfoAtom = atomWithStorage<TokenInfo | undefined>(
  STORAGE_KEY.TOKENINFO,
  undefined,
  bigintSafeStorage,
  {
    getOnInit: true
  }
)

export const rewardAtom = atomWithStorage<Reward | undefined>(STORAGE_KEY.REWARD, undefined, undefined, {
  getOnInit: true
})
