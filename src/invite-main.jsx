import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './i18n.js'
import VijayInvite from './pages/VijayInvite.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VijayInvite />
  </StrictMode>,
)
