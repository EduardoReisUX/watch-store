import { create } from "zustand";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
}

interface CartState {
  state: {
    open: boolean;
    products: Product[];
  };
  actions: {
    toggle: () => void;
    add: (product: Product) => void;
  };
}

export const useCartStore = create<CartState>((set) => ({
  state: {
    open: false,
    products: [],
  },

  actions: {
    toggle: () =>
      set(({ state }) => ({
        state: {
          ...state,
          open: !state.open,
        },
      })),
    add: (product: Product) =>
      set(({ state }) => ({
        state: {
          open: true,
          products: [...state.products, product],
        },
      })),
  },
}));
