import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-12 justify-items-center p-6">
      {products.map((product) => (
        <div
          key={product.id}
          /* ADICIONADO: 'group' para controlar os filhos e efeitos de transição/elevação */
          className="group w-full max-w-[396px] h-[410px] bg-white border border-gray-100 rounded-[20px] 
                     shadow-sm flex flex-col items-center pt-8 pb-6 px-6 
                     transition-all duration-300 ease-in-out
                     hover:shadow-2xl hover:-translate-y-2 hover:border-[#02D72F]/30"
        >
          {/* LINK DA IMAGEM */}
          <Link 
            to={`/product/${product.id}`} 
            className="block w-full max-w-[331px] h-[188px] cursor-pointer overflow-hidden rounded-lg"
          >
            <div className="w-full h-full bg-[#F2F2F2] flex items-center justify-center p-4 transition-colors duration-300 group-hover:bg-[#ebfbee]">
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                /* ADICIONADO: Efeito de zoom suave na imagem ao dar hover no card */
                className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
          </Link>

          {/* ÁREA DE TEXTO */}
          <div className="flex flex-col items-center mt-[13px] w-full flex-1 overflow-hidden">
            
            <Link to={`/product/${product.id}`} className="block w-full text-center">
              <h3 className="text-[18px] leading-[22px] font-bold text-[#1C1C1C] truncate px-2 transition-colors duration-300 group-hover:text-[#02D72F]">
                {product.title}
              </h3>
            </Link>

            <div className="mt-[13px] w-full max-w-[324px] h-[106px] overflow-hidden">
              <p className="text-[12px] text-[#515151] text-center leading-[16px] line-clamp-4">
                {product.description}
              </p>
            </div>

            {/* RODAPÉ */}
            <div className="w-full mt-auto flex justify-between items-center px-1">
              <span className="font-['Montserrat'] text-[20px] font-bold text-[#1C1C1C]">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              
              <button
                className="bg-[#02D72F] text-white text-[10px] font-black uppercase w-[108px] h-[48px] 
                           rounded-full flex items-center justify-center transition-all duration-300
                           hover:bg-[#01b526] hover:shadow-lg active:scale-95"
                onClick={() => onAddToCart?.({
                  id: product.id,
                  name: product.title,
                  price: product.price,
                  thumbnail: product.thumbnail
                })}
              >
                COMPRAS
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cards