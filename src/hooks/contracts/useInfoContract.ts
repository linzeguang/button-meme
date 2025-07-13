import { useReadContract } from 'wagmi'

import { InfoAbi } from '@/constants/abi'

const useInfoContract = () => {
  return useReadContract({
    abi: InfoAbi,
    address: '0x184a9e7D2D955c91dfebCAE5102157B52455202E'
  })
}

export default useInfoContract
