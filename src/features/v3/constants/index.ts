import { CHAIN_TO_ADDRESSES_MAP, ChainId } from '@uniswap/sdk-core'
import { POOL_INIT_CODE_HASH as UNISWAP_V3_POOL_INIT_CODE_HASH } from '@uniswap/v3-sdk'

import type { Address } from 'viem'

const ADDRESSES_MAP = CHAIN_TO_ADDRESSES_MAP[ChainId.MONAD_TESTNET]

export const FACTORY_ADDRESS = ADDRESSES_MAP.v3CoreFactoryAddress as Address
export const POOL_INIT_CODE_HASH = UNISWAP_V3_POOL_INIT_CODE_HASH
export const ROUTER = ADDRESSES_MAP.swapRouter02Address as Address
export const NONFUNGIBLE_POSITION_MANAGER = ADDRESSES_MAP.nonfungiblePositionManagerAddress as Address

// export const FACTORY_ADDRESS = '0x71640BD6b4CC7fcE2b9F41b9A80329667121B0e6' as Address
// export const POOL_INIT_CODE_HASH = '0x2389fcb4e67dbd817f2a6dc070fd4b32f51bbddd480cf3d1ba446fea1a475b05'
// export const ROUTER = '0x1Bcb30644f7FBDa2Ab01aD7e8d265E513544CF80' as Address
// export const NONFUNGIBLE_POSITION_MANAGER = '0x190e01fc172415df67b8Df7A012075C62D0bAf3c' as Address
