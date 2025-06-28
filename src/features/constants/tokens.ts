import { ChainId, Token, WETH9 } from '@uniswap/sdk-core'

import * as Addresses from './addresses'

export const WETH = new Token(
  ChainId.MONAD_TESTNET,
  Addresses.WETH,
  WETH9[ChainId.MONAD_TESTNET].decimals,
  WETH9[ChainId.MONAD_TESTNET].symbol,
  WETH9[ChainId.MONAD_TESTNET].name
)

export const WMON = new Token(
  ChainId.MONAD_TESTNET,
  WETH9[ChainId.MONAD_TESTNET].address,
  WETH9[ChainId.MONAD_TESTNET].decimals,
  WETH9[ChainId.MONAD_TESTNET].symbol,
  WETH9[ChainId.MONAD_TESTNET].name
)

export const AAA = new Token(ChainId.MONAD_TESTNET, Addresses.AAA, 18, 'AAA', 'AAA')

export const BBB = new Token(ChainId.MONAD_TESTNET, Addresses.BBB, 18, 'BBB', 'BBB')

export const CCC = new Token(ChainId.MONAD_TESTNET, Addresses.CCC, 9, 'CCC', 'CCC')

export const DDD = new Token(ChainId.MONAD_TESTNET, Addresses.DDD, 6, 'DDD', 'DDD')
