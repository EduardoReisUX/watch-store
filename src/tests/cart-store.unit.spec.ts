import { act, renderHook } from "@testing-library/react-hooks";
import { Server } from "miragejs";
import { makeServer } from "../services/miragejs/server";
import { useCartStore } from "../store/cart";

type Models = {
  product: {
    id: string;
    title: string;
    price: string;
    image: string;
  };
};

describe("Cart Store", () => {
  let server: Server<Models>;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should return open equals false on initial state", () => {
    const { result } = renderHook(() => useCartStore());

    expect(result.current.state.open).toBe(false);
  });

  it("should return an empty array for products on initial state", () => {
    const { result } = renderHook(() => useCartStore());

    expect(Array.isArray(result.current.state.products)).toBe(true);
    expect(result.current.state.products).toHaveLength(0);
  });

  it("should toggle open state", () => {
    const { result } = renderHook(() => useCartStore());
    const {
      actions: { toggle },
    } = result.current;

    expect(result.current.state.open).toBe(false);

    act(() => toggle());
    expect(result.current.state.open).toBe(true);

    act(() => toggle());
    expect(result.current.state.open).toBe(false);
  });

  it("should add product to the products array", () => {
    const products = server.createList("product", 2);

    const { result } = renderHook(() => useCartStore());
    const {
      actions: { add },
    } = result.current;

    products.forEach((product) => {
      act(() => add(product));
    });

    expect(result.current.state.products).toHaveLength(2);
  });
});
