import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { setAutoFreeze } from "immer";
import { CartItem } from "../components/CartItem";
import { useCartStore } from "../store/cart";
import userEvent from "@testing-library/user-event";

setAutoFreeze(false);

const product = {
  id: "1",
  title: "Relógio bonito",
  price: "22.00",
  image: "asd",
};

function renderCartItem() {
  render(<CartItem product={product} />);
}

describe("CartItem", () => {
  it("should render CartItem", () => {
    renderCartItem();
    expect(screen.getByTestId("cart-item")).toBeInTheDocument();
  });

  it("should display proper content", () => {
    renderCartItem();
    expect(screen.getByText(/Relógio bonito/i)).toBeInTheDocument();
    expect(screen.getByText(/22.00/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", product.image);
    expect(screen.getByRole("img")).toHaveAttribute("alt", product.title);
  });

  it("should display 1 as initial quantity", () => {
    renderCartItem();
    expect(screen.getByTestId("quantity").textContent).toBe("1");
  });

  it("should increase quantity by 1 when increase button is clicked", async () => {
    renderCartItem();

    const increaseBtn = screen.getByTestId("increase-btn");

    await userEvent.click(increaseBtn);

    expect(screen.getByTestId("quantity").textContent).toBe("2");
  });

  it("should decrease quantity by 1 when decrease button is clicked", async () => {
    renderCartItem();

    const increaseBtn = screen.getByTestId("increase-btn");
    const decreaseBtn = screen.getByTestId("decrease-btn");

    await userEvent.click(increaseBtn);
    expect(screen.getByTestId("quantity").textContent).toBe("2");

    await userEvent.click(increaseBtn);
    expect(screen.getByTestId("quantity").textContent).toBe("3");

    await userEvent.click(decreaseBtn);
    expect(screen.getByTestId("quantity").textContent).toBe("2");
  });

  it("should not go below zero in the quantity", async () => {
    renderCartItem();

    const decreaseBtn = screen.getByTestId("decrease-btn");

    await userEvent.click(decreaseBtn);
    expect(screen.getByTestId("quantity").textContent).toBe("0");

    await userEvent.click(decreaseBtn);
    expect(screen.getByTestId("quantity").textContent).toBe("0");

    await userEvent.click(decreaseBtn);

    expect(
      Number(screen.getByTestId("quantity").textContent)
    ).toBeGreaterThanOrEqual(0);
  });

  it("should call remove() when remove button is clicked", async () => {
    const { result } = renderHook(() => useCartStore());
    const spy = jest.spyOn(result.current.actions, "remove");

    render(<CartItem product={product} />);

    const button = screen.getByRole("button", { name: /remove/i });

    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith(product);
  });
});
