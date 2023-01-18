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
    reset: () => void;
    add: (product: Product) => void;
    increase: (product: Product) => void;
    remove: (product: Product) => void;
    decrease: (product: Product) => void;
    removeAll: () => void;
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
          const notExists = !state.products.find(({ id }) => id === product.id);

          if (notExists) {
            if (!product.quantity) {
              product.quantity = 1;
            }
            state.products.push(product);
            state.open = true;
          }
        });
      },

      increase(product) {
        setState(({ state }) => {
          const localProduct = state.products.find(
            ({ id }) => id === product.id
          );

          if (localProduct && localProduct.quantity) {
            localProduct.quantity++;
          }
        });
      },

      remove(product) {
        setState(({ state }) => {
          const exists = !!state.products.find(({ id }) => id === product.id);

          if (exists) {
            state.products = state.products.filter(({ id }) => {
              return id !== product.id;
            });
          }
        });
      },

      decrease(product) {
        setState(({ state }) => {
          const localProduct = state.products.find(
            ({ id }) => id === product.id
          );

          if (localProduct && localProduct.quantity) {
            localProduct.quantity--;
          }
        });
      },

      removeAll() {
        setState(({ state }) => {
          state.products = [];
        });
      },
    },
  };
});
