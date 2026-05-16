import React from 'react'
import { createRoot } from 'react-dom/client'
import Cards from './App'
import './styles/index.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root container missing')
}

createRoot(container).render(
  <React.StrictMode>
    <Cards />
  </React.StrictMode>
)