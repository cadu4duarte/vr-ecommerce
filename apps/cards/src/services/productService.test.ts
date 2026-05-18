import { productService } from './productService';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('productService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve formatar os dados da API corretamente', async () => {
    const mockApiResponse = {
      products: [
        { id: 1, title: 'Produto Teste', price: 100, thumbnail: 'imagem.jpg', description: 'Desc' }
      ]
    };

    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });

    const products = await productService.getProducts(1);

    expect(products).toHaveLength(1);
    expect(products[0].title).toBe('Produto Teste');
    expect(products[0].price).toBe(100);
  });

  it('deve retornar array vazio se a API falhar', async () => {
    (globalThis.fetch as any).mockResolvedValue({ ok: false });
    const products = await productService.getProducts();
    expect(products).toEqual([]);
  });
});