import React from 'react'


type CartButtonProps = {
  count: number
  onClick: () => void
}

export function CartButton({ count, onClick }: CartButtonProps) {
  return (
    <button
      className="relative"
      onClick={onClick}
      aria-label="Abrir carrinho"
    >
      🛒
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
          {count}
        </span>
      )}
    </button>
  )
}