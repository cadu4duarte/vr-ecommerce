import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartModal } from './CartModal';

describe('CartModal - Lógica de Agrupamento', () => {
  const mockItems = [
    { id: 1, name: 'Produto A', price: 10, thumbnail: '' },
    { id: 1, name: 'Produto A', price: 10, thumbnail: '' }, // Repetido
    { id: 2, name: 'Produto B', price: 20, thumbnail: '' },
  ];

  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onRemove: vi.fn(),
    onClear: vi.fn(),
  };

  it('deve agrupar itens repetidos e mostrar a quantidade correta (2x)', () => {
    render(<CartModal {...defaultProps} items={mockItems} />);

    const productTitles = screen.getAllByText('Produto A');
    expect(productTitles).toHaveLength(1);

    expect(screen.getByText('2x')).toBeInTheDocument();
  });

  it('deve calcular o subtotal corretamente para itens agrupados', () => {
    render(<CartModal {...defaultProps} items={mockItems} />);

    expect(screen.getAllByText(/R\$ 20,00/)).toHaveLength(2);
  });

  it('deve exibir o total geral corretamente', () => {
    render(<CartModal {...defaultProps} items={mockItems} />);
    
    expect(screen.getByText(/R\$ 40,00/)).toBeInTheDocument();
  });

  it('não deve renderizar nada quando isOpen for false', () => {
    const { container } = render(<CartModal {...defaultProps} isOpen={false} items={mockItems} />);
    expect(container.firstChild).toBeNull();
  });
});