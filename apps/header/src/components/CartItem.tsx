import React from 'react'
import { CartItem as Item } from '../types/CartItem'

type CartItemProps = {
  item: Item
  onRemove: (id: number) => void
}

export function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <li className="flex justify-between items-center">
      <span>
        {item.name} — R$ {item.price}
      </span>
      <button
        className="text-red-500 text-sm"
        onClick={() => onRemove(item.id)}
      >
        Remover
      </button>
    </li>
  )
}