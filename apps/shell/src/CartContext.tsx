import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'

export type CartItem = {
  id: number
  name: string
  price: number
  thumbnail?: string
}

type CartContextType = {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const STORAGE_KEY = 'vr-ecommerce-cart'

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<string | null>(null)

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addToCart(item: CartItem) {
    setItems(prev => [...prev, item])

    setNotification(item.name)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  function removeFromCart(id: number) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart }}
    >
      {children}

      {notification && (
        <div 
          className="fixed bottom-8 right-8 z-[9999] animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="bg-white border-l-4 border-[#02D72F] shadow-2xl rounded-lg p-4 flex items-center gap-4 min-w-[320px]">
            {/* Ícone de Sucesso */}
            <div className="bg-[#02D72F] rounded-full p-1 flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-[#02D72F] uppercase tracking-widest">
                Adicionado ao carrinho!
              </span>
              <span className="text-sm font-bold text-gray-800">
                {notification}
              </span>
            </div>

            {/* Botão fechar rápido */}
            <button 
              onClick={() => setNotification(null)}
              className="ml-auto text-gray-300 hover:text-gray-500"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}