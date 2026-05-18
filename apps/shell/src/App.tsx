import { Suspense, lazy } from 'react'
import { useCart } from './CartContext'

const Header = lazy(() => import('header/Header'))
const Cards = lazy(() => import('cards/Cards'))
const Footer = lazy(() => import('footer/Footer'))

function CardsWithCart() {
  const { addToCart } = useCart()
  return <Cards onAddToCart={addToCart} />
}

function HeaderWithCart() {
  const { items, removeFromCart, clearCart } = useCart()
  return (
    <Header
      items={items}
      onRemove={removeFromCart}
      onClear={clearCart}
    />
  )
}

function App() {
  return (
    <>
      <Suspense fallback={<div>Carregando Header...</div>}>
        <HeaderWithCart />
      </Suspense>

      <main className="p-6">
        <Suspense fallback={<div>Carregando Cards...</div>}>
          <CardsWithCart />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse" />}>
        <Footer />
      </Suspense>
    </>
  )
}

export default App