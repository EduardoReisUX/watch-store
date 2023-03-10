import { act, renderHook, RenderResult } from "@testing-library/react-hooks";
import { Server } from "miragejs";
import { Product } from "../hooks/useFetchProducts";
import { makeServer } from "../services/miragejs/server";
import { CartState, useCartStore } from "../store/cart";

type Models = {
  product: Product;
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

  it("should assign 1 as initial quantity on product add()", () => {
    const product = server.create("product");

    act(() => result.current.actions.add(product));

    expect(result.current.state.products[0]?.quantity).toBe(1);
  });

  it("should increase product quantity", () => {
    const product = server.create("product");

    act(() => {
      result.current.actions.add(product);
      result.current.actions.increase(product);
    });

    expect(result.current.state.products[0]?.quantity).toBe(2);
  });

  it("should not increase product quantity if product is not found", () => {
    const [product1, product2] = server.createList("product", 2);

    act(() => {
      result.current.actions.add(product1);
      result.current.actions.increase(product2);
    });

    expect(result.current.state.products[0]?.quantity).toBe(1);
    expect(result.current.state.products[1]).toBe(undefined);
    expect(result.current.state.products[1]?.quantity).toBe(undefined);
  });

  it("should decrease product quantity", () => {
    const product = server.create("product");

    act(() => {
      result.current.actions.add(product);
      result.current.actions.increase(product);
      result.current.actions.decrease(product);
    });

    expect(result.current.state.products[0]?.quantity).toBe(1);
  });

  it("should not decrease product quantity below 0", () => {
    const product = server.create("product");

    act(() => {
      result.current.actions.add(product);
      result.current.actions.decrease(product);
      result.current.actions.decrease(product);
    });

    expect(result.current.state.products[0]?.quantity).toBe(0);
  });

  it("should not decrease product quantity if product is not found", () => {
    const [product1, product2] = server.createList("product", 2);

    act(() => {
      result.current.actions.add(product1);
      result.current.actions.increase(product1);
      result.current.actions.decrease(product2);
    });

    expect(result.current.state.products[0]?.quantity).toBe(2);
    expect(result.current.state.products[1]).toBe(undefined);
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

  it("should not change products from store if provided product doesn't exists", () => {
    const [product1, product2, product3] = server.createList("product", 3);

    act(() => result.current.actions.add(product1));
    act(() => result.current.actions.add(product2));

    expect(result.current.state.products).toHaveLength(2);

    act(() => result.current.actions.remove(product3));

    expect(result.current.state.products).toHaveLength(2);
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
