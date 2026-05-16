// apps/header/src/types/CartItem.ts
export type CartItem = {
  id: number;
  name: string;  // Certifique-se que o nome é 'name' e não 'title'
  price: number;
  thumbnail?: string; // Opcional para a imagem
}