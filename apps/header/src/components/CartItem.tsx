import React from 'react'
import { CartItem as ItemType } from '../types/CartItem'

export function CartItem({ item }: { item: ItemType }) {
  return (
    <div>
      {/* O erro TS2339 acontecia aqui */}
      <span>{item.name}</span> 
      <span>R$ {item.price}</span>
    </div>
  )
}