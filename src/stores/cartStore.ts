import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  clearCart: () => void;
  removeItem: (productId: number) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const current = state.items.find(
            (cartItem) => cartItem.productId === item.productId,
          );

          if (!current) {
            return { items: [...state.items, item] };
          }

          return {
            items: state.items.map((cartItem) =>
              cartItem.productId === item.productId
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + item.quantity,
                  }
                : cartItem,
            ),
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "petshop-cart",
    },
  ),
);
