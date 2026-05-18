import cart from '../../../shared/assets/cart.svg'


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
      <img src={cart} alt="Carrinho" className="w-10 h-10" />
      {count > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
          {count}
        </span>
      )}
    </button>
  )
}