import { fireEvent, render, screen } from "@testing-library/react";
import { act, renderHook, RenderResult } from "@testing-library/react-hooks";
import { Server } from "miragejs";
import { Cart } from "../components/Cart";
import { Product } from "../hooks/useFetchProducts";
import { makeServer } from "../services/miragejs/server";
import { CartState, useCartStore } from "../store/cart";

type Models = {
  product: Product;
};

describe("Cart", () => {
  let server: Server<Models>;
  let result: RenderResult<CartState>;
  let spy: jest.SpyInstance;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
    result = renderHook(() => useCartStore()).result;
    spy = jest.spyOn(result.current.actions, "toggle");
  });

  afterEach(() => {
    jest.clearAllMocks();
    act(() => result.current.actions.reset());
    server.shutdown();
  });

  it("should initially be invisible", () => {
    render(<Cart />);

    expect(screen.getByTestId("cart")).toHaveClass("hidden");
  });

  it("should be visible when toggled", () => {
    render(<Cart />);

    const product = server.create("product");

    act(() => result.current.actions.add(product));

    expect(screen.getByTestId("cart")).not.toHaveClass("hidden");
  });

  it("should call store toggle() twice", () => {
    render(<Cart />);

    const button = screen.getByTestId("close-button");

    fireEvent.click(button);
    fireEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("should display 2 products", () => {
    const products = server.createList("product", 2);
    render(<Cart />);

    products.forEach((product) => {
      act(() => result.current.actions.add(product));
    });

    expect(screen.getAllByTestId("cart-item")).toHaveLength(2);
  });
});
