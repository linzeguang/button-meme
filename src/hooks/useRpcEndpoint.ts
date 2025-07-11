// import { useState } from 'react'

// import { useAtom } from 'jotai/react'

// import { RPCEndpoint, SUPPORT_RPC_ENDPOINT } from '@/constants/settings'
// import { rpcEndpointAtom } from '@/stores/settings'

// export const useRpcEndpoint = () => {
//   const [rpcEndpoint, setRpcEndpoint] = useAtom(rpcEndpointAtom)
//   const [rpcUrl, setRpcUrl] = useState(rpcEndpoint)
//   const [rpcEndpointKey, setRpcEndpointKey] = useState(
//     SUPPORT_RPC_ENDPOINT.find(({ url }) => url === rpcEndpoint)?.key || RPCEndpoint.Custom
//   )

//   return {
//     rpcUrl,
//     rpcEndpointKey,
//     setRpcUrl,
//     setRpcEndpoint,
//     setRpcEndpointKey
//   }
// }
