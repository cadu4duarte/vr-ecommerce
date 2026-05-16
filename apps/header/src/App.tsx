import React, { useState } from 'react'
import { CartButton } from './components/CartButton'
import { CartModal } from './components/CartModal'
import { CartItem } from './types/CartItem'

type HeaderProps = {
  items: CartItem[]
  onRemove: (id: number) => void
  onClear: () => void
}

function Header({ items, onRemove, onClear }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="bg-[#02D72F] text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          VR E-commerce
        </h1>

        <CartButton
          count={items.length}
          onClick={() => setIsOpen(true)}
        />
      </header>

      <CartModal
        isOpen={isOpen}
        items={items}
        onClose={() => setIsOpen(false)}
        onRemove={onRemove}
        onClear={onClear}
      />
    </>
  )
}

export default Header