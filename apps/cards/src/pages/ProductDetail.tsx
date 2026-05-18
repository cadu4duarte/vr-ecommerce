import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService, ProductDTO } from '../services/productService';
import { CartItem } from '../../../shared/types/CartItem';

type ProductDetailProps = {
  onAddToCart?: (item: CartItem) => void;
};

const ProductDetail = ({ onAddToCart }: ProductDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        try {
          const data = await productService.getProductById(Number(id));
          setProduct(data);
        } catch (error) {
          console.error("Produto não encontrado", error);
          navigate('/'); 
        } finally {
          setLoading(false);
        }
      }
    };

    loadProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 animate-pulse font-bold">Carregando detalhes do produto...</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-[1240px] mx-auto p-6 animate-in fade-in duration-500">
      
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 text-sm font-bold text-gray-400 hover:text-[#02D72F] transition-colors flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        VOLTAR
      </button>

      <div className="flex flex-col md:flex-row gap-12 bg-white p-6 sm:p-10 rounded-[20px] shadow-sm border border-gray-100">
        
       
        <div className="flex-1 bg-[#F2F2F2] rounded-xl p-8 flex items-center justify-center h-[300px] md:h-[500px]">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="max-w-full max-h-full object-contain mix-blend-multiply" 
          />
        </div>

        
        <div className="flex-1 flex flex-col">
          <div className="mb-6">
            <span className="text-[#02D72F] text-xs font-bold uppercase tracking-widest bg-[#02D72F]/10 px-3 py-1 rounded-full">
              {product.category || 'Premium'}
            </span>
          </div>

          <h1 className="text-[28px] md:text-[40px] font-bold text-[#1C1C1C] mb-4 leading-tight">
            {product.title}
          </h1>

          <div className="w-[324px] mb-8">
            <p className="text-[16px] text-[#515151] leading-relaxed">
              {product.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto border-t pt-8 gap-6">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs uppercase font-bold mb-1">Preço à vista</span>
              <span className="font-['Montserrat'] text-[32px] font-bold text-[#1C1C1C]">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            <button 
              onClick={() => onAddToCart?.({
                id: product.id,
                name: product.title,
                price: product.price,
                thumbnail: product.thumbnail
              })}
              className="w-full sm:w-auto bg-[#02D72F] hover:bg-green-600 text-white font-black px-12 py-5 rounded-full uppercase transition-all shadow-lg active:scale-95 text-sm"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;