import React, { useEffect, useState } from 'react'
import { productService, ProductDTO } from './services/productService'

// O tipo que o Shell e o Header esperam
type CardItem = {
  id: number
  name: string
  price: number
  thumbnail?: string
}

type CardsProps = {
  onAddToCart?: (item: CardItem) => void
}

function Cards({ onAddToCart }: CardsProps) {
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts(9) // Busca 9 produtos
        setProducts(data)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 animate-pulse">Carregando produtos...</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
        >
          {/* Imagem do Produto */}
          <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Conteúdo do Card */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-bold text-gray-800 text-lg mb-1">{product.title}</h3>
            <p className="text-gray-500 text-xs mb-4 line-clamp-2">
              Texto de referencia com descrição do produto
            </p>

            <div className="mt-auto flex justify-between items-center">
              <span className="font-bold text-gray-900 text-lg">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>

              <button
                className="bg-[#02D72F] hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full uppercase transition-colors"
                onClick={() => onAddToCart?.({
                  id: product.id,
                  name: product.title, // Mapeando title da API para name do Carrinho
                  price: product.price,
                  thumbnail: product.thumbnail
                })}
              >
                Compras
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cards