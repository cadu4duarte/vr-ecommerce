import { Suspense, lazy } from 'react'

const Header = lazy(() => import('header/Header'))

function App() {
  return (
    <>
      <Suspense fallback={<div>Carregando Header...</div>}>
        <Header />
      </Suspense>

      <main className="p-6">
        <h2 className="text-2xl font-bold">
          Shell - VR E-commerce
        </h2>
      </main>
    </>
  )
}

export default App