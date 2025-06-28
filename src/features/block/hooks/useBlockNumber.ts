import { useBlockNumber as _useBlockNumber } from 'wagmi'

const useBlockNumber = () => {
  const { data: _blockNumber, ...rest } = _useBlockNumber({ watch: true })

  return {
    blockNumber:
      typeof _blockNumber === 'bigint' ? Number(_blockNumber) : undefined,
    ...rest
  }
}

export default useBlockNumber
