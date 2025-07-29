// api/rpc.ts
export default async function handler(req, res) {
  const targetUrl = 'http://ec2-54-251-227-86.ap-southeast-1.compute.amazonaws.com:6979' // 例如 Infura/Alchemy 自己的 RPC 地址

  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 添加 Authorization 头如果你的 RPC 服务需要
      // "Authorization": "Bearer YOUR_KEY"
    },
    body: JSON.stringify(req.body)
  })

  const data = await response.json()

  res.setHeader('Access-Control-Allow-Origin', '*') // 或具体域名
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  res.status(response.status).json(data)
}
