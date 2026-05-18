import { CartItem } from '../../../shared/types/CartItem';

const BASE_URL = 'https://dummyjson.com';

// Interface para o que a API DummyJSON retorna
export interface ProductDTO {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  category: string;
}

export const productService = {
  async getProducts(limit = 10): Promise<ProductDTO[]> {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }

      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error("api-error:", error);
      return [];
    }
  },

  // Você já pode deixar preparado caso precise de um produto específico
  async getProductById(id: number): Promise<ProductDTO> {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return response.json();
  }
};