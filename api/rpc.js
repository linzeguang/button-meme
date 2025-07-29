// api/rpc.ts
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    // CORS 预检请求直接返回
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.status(200).end()
    return
  }

  const rpcUrl = 'http://ec2-54-251-227-86.ap-southeast-1.compute.amazonaws.com:6979' // 换成你的 RPC 地址

  try {
    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    })

    const data = await response.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json')
    res.status(response.status).json(data)
  } catch (err) {
    res.status(500).json({ error: 'Proxy error' })
  }
}
