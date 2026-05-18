import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Header from './App'
import { CartItem } from '../../shared/types/CartItem'
import './styles/index.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root container not found')
}

const mockItems: CartItem[] = []

const root = createRoot(container)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header
        items={mockItems}
        onRemove={() => {}}
        onClear={() => {}}
      />
    </BrowserRouter>
  </React.StrictMode>
)
