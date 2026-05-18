import { render } from '@testing-library/react';
import App from './App';
import { CartProvider } from './CartContext';
import React from 'react';
import { test, expect } from 'vitest';

test('Shell deve renderizar o esqueleto da aplicação', () => {
  const { container } = render(
    <CartProvider>
      <App />
    </CartProvider>
  );
  
  // Verifica se o container foi renderizado
  expect(container).toBeInTheDocument();
});