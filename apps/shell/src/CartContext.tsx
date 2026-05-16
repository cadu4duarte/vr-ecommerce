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
  // ✅ Inicializa o estado a partir do localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // ✅ Persiste no localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addToCart(item: CartItem) {
    setItems(prev => [...prev, item])
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