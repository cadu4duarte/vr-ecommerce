// src/bootstrap.tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { CartProvider } from './CartContext'
import './styles/index.css'

const container = document.getElementById('root')!
createRoot(container).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
)