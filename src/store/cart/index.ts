import { create } from "zustand";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
}

export interface CartState {
  state: {
    open: boolean;
    products: Product[];
  };
  actions: {
    toggle: () => void;
    add: (product: Product) => void;
    reset: () => void;
  };
}

const initialState = {
  open: false,
  products: [],
};

function addProduct({ products }: CartState["state"], product: Product) {
  if (products.includes(product)) {
    return [...products];
  }

  return [...products, product];
}

export const useCartStore = create<CartState>((set) => ({
  state: initialState,

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
          products: addProduct(state, product),
        },
      })),
    reset: () => set(() => ({ state: initialState })),
  },
}));
