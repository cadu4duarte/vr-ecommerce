type Card = {
  id: number
  name: string
  price: number
}

type CardsProps = {
  onAddToCart?: (card: Card) => void
}

const cards: Card[] = [
  { id: 1, name: 'Notebook', price: 4500 },
  { id: 2, name: 'Mouse', price: 150 },
  { id: 3, name: 'Teclado', price: 300 }
]

function Cards({ onAddToCart }: CardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map(card => (
        <div
          key={card.id}
          className="border rounded-lg p-4 shadow"
        >
          <h3 className="font-semibold text-lg">{card.name}</h3>
          <p className="text-gray-600">R$ {card.price}</p>

          <button
            className="mt-4 bg-[#02D72F] text-white px-4 py-2 rounded"
            onClick={() => onAddToCart?.(card)}
          >
            Adicionar ao carrinho
          </button>
        </div>
      ))}
    </div>
  )
}

export default Cards
