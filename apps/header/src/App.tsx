import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CartButton } from './components/CartButton'
import { CartModal } from './components/CartModal'
import { CartItem } from '../../shared/types/CartItem'
import logo from '../../shared/assets/logo-header.svg'

type HeaderProps = {
  items: CartItem[]
  onRemove: (id: number) => void
  onClear: () => void
}

function Header({ items, onRemove, onClear }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="bg-[#02D72F] px-8 h-16 flex justify-between items-center">

        <Link to="/">
          <img 
            src={logo} 
            alt="VR Logo" 
            className="w-8 h-8" 
          />
        </Link >
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