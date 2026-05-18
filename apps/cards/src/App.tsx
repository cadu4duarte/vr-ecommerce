import React, { useEffect, useState } from 'react'
import { productService, ProductDTO } from './services/productService'
import { CartItem } from '../../shared/types/CartItem'

type CardsProps = {
  onAddToCart?: (item: CartItem) => void
}

function Cards({ onAddToCart }: CardsProps) {
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts(9)
        setProducts(data)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) return <div className="p-10 text-center">Carregando...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10 justify-items-center p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-full max-w-[396px] h-[410px] bg-white border border-gray-200 rounded-[20px] shadow-sm flex flex-col items-center pt-8 pb-6 px-4 sm:px-6"
        >
          <div className="w-full max-w-[331px] h-[188px] bg-[#F2F2F2] rounded-lg overflow-hidden flex items-center justify-center p-4">
            <img src={product.thumbnail} alt={product.title} className="max-w-full max-h-full object-contain" />
          </div>

          <div className="flex flex-col items-center mt-[13px] w-full flex-1">
            <h3 className="text-[18px] leading-[22px] font-bold text-[#1C1C1C] text-center line-clamp-1">
              {product.title}
            </h3>

            <div className="mt-[13px] w-full max-w-[324px] h-[106px]">
              <p className="text-[12px] text-[#515151] text-center leading-[16px] line-clamp-4">
                {product.description}
              </p>
            </div>

            <div className="w-full mt-auto flex justify-between items-center gap-2">
              <span className="font-['Montserrat'] text-[18px] lg:text-[20px] font-bold text-[#1C1C1C] whitespace-nowrap">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <button
                className="bg-[#02D72F] hover:bg-green-600 text-white text-[10px] font-black uppercase w-[108px] h-[48px] rounded-full flex-shrink-0 flex items-center justify-center transition-colors"
                onClick={() => onAddToCart?.({
                  id: product.id,
                  name: product.title,
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