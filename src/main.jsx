import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { instalarLucide } from './ds/lucideRuntime'
import './ds/styles.css'
import './index.css'

// Os componentes do design system dependem deste runtime de ícones.
instalarLucide()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
