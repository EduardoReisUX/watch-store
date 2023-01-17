import { act, renderHook, RenderResult } from "@testing-library/react-hooks";
import { Server } from "miragejs";
import { makeServer } from "../services/miragejs/server";
import { CartState, useCartStore } from "../store/cart";

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
  let result: RenderResult<CartState>;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
    result = renderHook(() => useCartStore()).result;
  });

  afterEach(() => {
    server.shutdown();
    act(() => result.current.actions.reset());
  });

  it("should return open equals false on initial state", () => {
    expect(result.current.state.open).toBe(false);
  });

  it("should return an empty array for products on initial state", () => {
    expect(Array.isArray(result.current.state.products)).toBe(true);
    expect(result.current.state.products).toHaveLength(0);
  });

  it("should toggle open state", () => {
    const {
      actions: { toggle },
    } = result.current;

    expect(result.current.state.open).toBe(false);
    expect(result.current.state.products).toHaveLength(0);

    act(() => toggle());
    expect(result.current.state.open).toBe(true);

    act(() => toggle());
    expect(result.current.state.open).toBe(false);
    expect(result.current.state.products).toHaveLength(0);
  });

  it("should add product to products list", () => {
    const products = server.createList("product", 2);

    const {
      actions: { add },
    } = result.current;

    products.forEach((product) => {
      act(() => add(product));
    });

    expect(result.current.state.products).toHaveLength(2);
  });

  it("should not add same product twice", () => {
    const product = server.create("product");
    const {
      actions: { add },
    } = result.current;

    act(() => add(product));
    act(() => add(product));

    expect(result.current.state.products).toHaveLength(1);
  });

  it("should remove a product from the store", () => {
    const products = server.createList("product", 3);

    products.forEach((product) => {
      act(() => result.current.actions.add(product));
    });

    expect(result.current.state.products).toHaveLength(3);

    const [product1, product2, product3] = products;

    act(() => result.current.actions.remove(product2));

    expect(result.current.state.products).toHaveLength(2);
    expect(result.current.state.products.includes(product2)).toBeFalsy();
  });

  it("should remove all products from the store", () => {
    const products = server.createList("product", 3);

    products.forEach((product) => {
      act(() => result.current.actions.add(product));
    });

    expect(result.current.state.products).toHaveLength(3);

    act(() => result.current.actions.removeAll());

    expect(Array.isArray(result.current.state.products)).toBe(true);
    expect(result.current.state.products).toHaveLength(0);
  });
});
