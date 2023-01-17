import produce from "immer";
import { create } from "zustand";
import { Product } from "../../hooks/useFetchProducts";

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

type TSetStateFnParam = (state: CartState) => void;

const initialState: CartState["state"] = {
  open: false,
  products: [],
};

export const useCartStore = create<CartState>((set) => {
  const setState = (fn: TSetStateFnParam) => set(produce(fn));

  return {
    state: initialState,

    actions: {
      toggle() {
        setState(({ state }) => {
          state.open = !state.open;
        });
      },

      reset() {
        setState((store) => {
          store.state = initialState;
        });
      },

      add(product) {
        setState(({ state }) => {
          if (!state.products.includes(product)) {
            state.products.push(product);
            state.open = true;
          }
        });
      },
    },
  };
});
