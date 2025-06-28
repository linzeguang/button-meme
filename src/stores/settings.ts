import { atomWithStorage } from 'jotai/utils'

import { DEFAULT_RPC_ENDPOINT } from '@/constants/settings'
import { STORAGE_KEY } from '@/constants/storages'

export const rpcEndpointAtom = atomWithStorage<string>(STORAGE_KEY.RPC_ENDPOINT, DEFAULT_RPC_ENDPOINT.url, undefined, {
  getOnInit: true
})
