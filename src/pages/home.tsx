import React from 'react'

import { toggleLight } from '@/lib/utils'

const Home: React.FC = () => {
  return (
    <div>
      <button
        onClick={() => {
          const isLight = toggleLight()
          console.log('>>>>>> isLight: ', isLight)
        }}
      >
        theme
      </button>
    </div>
  )
}

export default Home
