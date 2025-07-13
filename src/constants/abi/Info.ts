export default [
  {
    inputs: [{ internalType: 'address', name: '_poolFactory', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'pid', type: 'uint256' }],
    name: 'accountsCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'pid', type: 'uint256' }],
    name: 'getBaseInfo',
    outputs: [
      { internalType: 'address', name: '_miningPool', type: 'address' },
      { internalType: 'address', name: '_stableToken', type: 'address' },
      { internalType: 'address', name: '_mintToken', type: 'address' },
      { internalType: 'bool', name: '_checkMerkleRoot', type: 'bool' },
      { internalType: 'uint32', name: '_epochReleaseRate', type: 'uint32' },
      { internalType: 'uint256', name: '_startBlock', type: 'uint256' },
      { internalType: 'uint256', name: '_totalLPH', type: 'uint256' },
      { internalType: 'uint256', name: '_userRewardsAcc', type: 'uint256' },
      { internalType: 'uint256', name: '_thRewardsAcc', type: 'uint256' },
      { internalType: 'uint256', name: '_tsRewardsAcc', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getProjectCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'pid', type: 'uint256' }],
    name: 'getProjectInfo',
    outputs: [
      { internalType: 'string', name: '_name', type: 'string' },
      { internalType: 'uint32', name: '_epoch', type: 'uint32' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'pid', type: 'uint256' },
      { internalType: 'address', name: 'leader', type: 'address' },
      { internalType: 'uint256', name: 'startPos', type: 'uint256' }
    ],
    name: 'getReferences',
    outputs: [
      { internalType: 'uint256', name: 'length', type: 'uint256' },
      { internalType: 'address[]', name: 'data', type: 'address[]' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'pid', type: 'uint256' },
      { internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'getUserInfo',
    outputs: [
      { internalType: 'uint256', name: 'investedAcc', type: 'uint256' },
      { internalType: 'uint256', name: 'lph', type: 'uint256' },
      { internalType: 'uint256', name: 'lphRewardPending', type: 'uint256' },
      { internalType: 'uint256', name: 'claimedRewardsLPH', type: 'uint256' },
      { internalType: 'uint256', name: 'claimedRewardsTH', type: 'uint256' },
      { internalType: 'uint256', name: 'claimedRewardsTS', type: 'uint256' },
      { internalType: 'uint256', name: 'referencesCount', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'pid', type: 'uint256' },
      { internalType: 'uint256', name: 'index', type: 'uint256' }
    ],
    name: 'getUserRewards',
    outputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'address', name: 'leader', type: 'address' },
      { internalType: 'uint256', name: 'level', type: 'uint256' },
      { internalType: 'uint256', name: 'rewardAcc', type: 'uint256' },
      { internalType: 'uint256', name: 'referencesRewardAcc', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'poolFactory',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'pid', type: 'uint256' },
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' }
    ],
    name: 'saleEstimate',
    outputs: [
      { internalType: 'uint256', name: 'totalFund', type: 'uint256' },
      { internalType: 'uint256', name: 'myFund', type: 'uint256' },
      { internalType: 'uint256', name: 'myLPH', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'swapRouter',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const
