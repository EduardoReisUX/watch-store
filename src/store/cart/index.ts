import { create } from "zustand";

interface CartState {
  state: {
    open: boolean;
  };
  actions: {
    toggle: () => void;
  };
}

export const useCartStore = create<CartState>((set) => ({
  state: {
    open: true,
  },

  actions: {
    toggle: () => set(({ state }) => ({ state: { open: !state.open } })),
  },
}));
