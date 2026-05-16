export type CartItem = {
  id: number;
  name: string;
  price: number;
  thumbnail?: string; // Adicionei como opcional caso queira usar imagens
};