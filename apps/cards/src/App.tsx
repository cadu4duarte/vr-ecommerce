import React, { useEffect, useState } from 'react'
import { productService, ProductDTO } from './services/productService'

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 justify-items-center p-6">
      {products.map((product) => (
        <div
          key={product.id}
          // h-[410px] e w-[396px] conforme o print
          // pb-6 (que são 24px) conforme o Padding Bottom do Figma
          className="w-[396px] h-[410px] bg-white border border-gray-200 rounded-[20px] shadow-sm flex flex-col items-center pt-8 pb-6 px-6"
        >
          {/* IMAGEM */}
          <div className="w-[331px] h-[188px] bg-[#F2F2F2] rounded-lg overflow-hidden flex items-center justify-center p-4">
            <img src={product.thumbnail} alt={product.title} className="max-w-full max-h-full object-contain" />
          </div>

          {/* O "Gap 13" do Figma entre os elementos abaixo da imagem */}
          <div className="flex flex-col items-center mt-[13px] w-full flex-1">

            {/* TITULO */}
            <h3 className="text-[18px] leading-[22px] font-bold text-[#1C1C1C] text-center">
              {product.title}
            </h3>

            {/* DESCRIÇÃO - com o Gap de 13px em relação ao título */}
            <div className="mt-[13px] w-[324px] h-[106px]">
              <p className="text-[12px] text-[#515151] text-center leading-[16px]">
                {product.description.substring(0, 100)}...
              </p>
            </div>

            {/* RODAPÉ - Ajustado para alinhar com o Padding Bottom de 24px */}
            <div className="w-full mt-auto flex justify-between items-center">
              <span className="font-['Montserrat'] text-[20px] font-bold text-[#1C1C1C]">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <button
                className="
                  bg-[#02D72F] 
                  hover:bg-green-600 
                  text-white 
                  text-[10px] 
                  font-black 
                  uppercase 
                  tracking-wider
                  /* Medidas exatas do Figma */
                  w-[108px] 
                  h-[48px] 
                  rounded-full 
                  /* Garantir centralização do texto */
                  flex items-center justify-center 
                  transition-colors"
                // ADICIONE ESTA LINHA ABAIXO:
                onClick={() => onAddToCart?.({
                  id: product.id,
                  name: product.title,      // Mapeia o 'title' da API para o 'name' do seu tipo
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