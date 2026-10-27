import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './sponsors.css'
import './checkout.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
