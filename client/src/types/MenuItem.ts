export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  allergens: string;
  category: {
    id: number;
    name: string;
  };
};
