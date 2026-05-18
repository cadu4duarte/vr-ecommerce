import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { useCart } from './CartContext'

const Header = lazy(() => import('header/Header'))
const Cards = lazy(() => import('cards/Cards'))
const Footer = lazy(() => import('footer/Footer'))
const ProductDetail = lazy(() => import('cards/ProductDetail'))

function CardsWithCart() {
  const { addToCart } = useCart()
  return <Cards onAddToCart={addToCart} />
}

function ProductDetailWithCart() {
  const { addToCart } = useCart()
  return <ProductDetail onAddToCart={addToCart} />
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
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        {/* O Header fica fixo no topo em todas as páginas */}
        <Suspense fallback={<div className="h-16 bg-green-500 animate-pulse" />}>
          <HeaderWithCart />
        </Suspense>

        {/* O 'main' agora gerencia as trocas de página através do Routes */}
        <main className="flex-1 container mx-auto px-4 md:px-8 py-10">
          <Routes>
            {/* Página Inicial: Vitrine de Cards */}
            <Route 
              path="/" 
              element={
                <Suspense fallback={<div>Carregando vitrine...</div>}>
                  <CardsWithCart />
                </Suspense>
              } 
            />

            {/* Página de Detalhes: ID dinâmico */}
            <Route 
              path="/product/:id" 
              element={
                <Suspense fallback={<div>Carregando detalhes do produto...</div>}>
                  <ProductDetailWithCart />
                </Suspense>
              } 
            />
          </Routes>
        </main>

        {/* O Footer fica fixo no rodapé em todas as páginas */}
        <Suspense fallback={<div className="h-20 bg-gray-100 animate-pulse" />}>
          <Footer />
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

export default App