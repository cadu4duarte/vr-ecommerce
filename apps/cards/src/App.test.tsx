import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Cards from './App';
import { productService } from './services/productService';

vi.mock('./services/productService', () => ({
  productService: {
    getProducts: vi.fn()
  }
}));

describe('Componente Cards', () => {
  const mockProducts = [
    { id: 1, title: 'Batom Vermelho', price: 20, thumbnail: 'foto.jpg', description: 'Um batom' }
  ];

  beforeEach(() => {
    (productService.getProducts as any).mockResolvedValue(mockProducts);
  });

  it('deve renderizar o card do produto após o carregamento', async () => {
    render(<Cards onAddToCart={vi.fn()} />);

    const title = await waitFor(() => screen.getByText('Batom Vermelho'));
    expect(title).toBeInTheDocument();
    expect(screen.getByText('R$ 20,00')).toBeInTheDocument();
  });

  it('deve chamar a função onAddToCart ao clicar no botão Compras', async () => {
    const onAddToCartMock = vi.fn();
    render(<Cards onAddToCart={onAddToCartMock} />);

    const button = await waitFor(() => screen.getByRole('button', { name: /compras/i }));
    fireEvent.click(button);

    expect(onAddToCartMock).toHaveBeenCalledWith(expect.objectContaining({
      id: 1,
      name: 'Batom Vermelho'
    }));
  });
});