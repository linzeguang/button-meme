import { atomWithStorage } from 'jotai/utils'

import { STORAGE_KEY } from '@/constants/storages'
import { Project } from '@/hooks/contracts/types'

export const projectsAtom = atomWithStorage<Project[]>(STORAGE_KEY.PROJECTS, [], undefined, { getOnInit: true })
