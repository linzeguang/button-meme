import { atomWithStorage } from 'jotai/utils'

import { STORAGE_KEY } from '@/constants/storages'
import { DEFAULT_RESOLUTIONS } from '@/constants/tradingiew'
import { Project } from '@/hooks/contracts/types'
import { ResolutionString } from 'public/charting_library/charting_library'

export const intervalAtom = atomWithStorage<ResolutionString>(STORAGE_KEY.INTERVAL, DEFAULT_RESOLUTIONS, undefined, {
  getOnInit: true
})

export const projectsAtom = atomWithStorage<Project[]>(
  STORAGE_KEY.PROJECTS,
  [{ name: 'BTN', epoch: 0, id: 0 }],
  undefined,
  { getOnInit: true }
)
