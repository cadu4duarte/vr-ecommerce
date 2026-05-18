import { render } from '@testing-library/react';
import Footer from './App';
import React from 'react';
import { expect, test } from 'vitest';

test('Footer deve renderizar sem quebrar', () => {
  render(<Footer />);
});