import React from 'react'
import { CartItem as ItemType } from '../../../shared/types/CartItem'

export function CartItem({ item }: { item: ItemType }) {
  return (
    <div>
      <span>{item.name}</span> 
      <span>R$ {item.price}</span>
    </div>
  )
}