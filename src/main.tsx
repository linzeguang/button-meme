import { createRoot } from 'react-dom/client'

import './styles/index.css'
import RootProvider from '@/providers/index.tsx'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <RootProvider>
    <App />
  </RootProvider>
)
