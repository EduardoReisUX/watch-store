import { fireEvent, render, screen } from "@testing-library/react";
import { CartItem } from "../components/CartItem";

const product = {
  title: "Relógio bonito",
  price: "22.00",
  image: "asd",
};

describe("CarItem", () => {
  beforeEach(() => {
    render(<CartItem product={product} />);
  });

  it("should render CarItem", () => {
    expect(screen.getByTestId("cart-item")).toBeInTheDocument();
  });

  it("should display proper content", () => {
    expect(screen.getByText(/Relógio bonito/i)).toBeInTheDocument();
    expect(screen.getByText(/22.00/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", product.image);
    expect(screen.getByRole("img")).toHaveAttribute("alt", product.title);
  });

  it("should display 1 as initial quantity", () => {
    expect(screen.getByTestId("quantity").textContent).toBe("1");
  });

  it("should increase quantity by 1 when increase button is clicked", () => {
    const [_, increaseButton] = screen.getAllByRole("button");

    fireEvent.click(increaseButton);

    expect(screen.getByTestId("quantity").textContent).toBe("2");
  });

  it("should decrease quantity by 1 when decrease button is clicked", () => {
    const [decreaseButton, increaseButton] = screen.getAllByRole("button");

    fireEvent.click(increaseButton);
    expect(screen.getByTestId("quantity").textContent).toBe("2");

    fireEvent.click(increaseButton);
    expect(screen.getByTestId("quantity").textContent).toBe("3");

    fireEvent.click(decreaseButton);
    expect(screen.getByTestId("quantity").textContent).toBe("2");
  });

  it("should not go below zero in the quantity", () => {
    const [decreaseButton, _] = screen.getAllByRole("button");

    fireEvent.click(decreaseButton);
    expect(screen.getByTestId("quantity").textContent).toBe("0");

    fireEvent.click(decreaseButton);
    expect(screen.getByTestId("quantity").textContent).toBe("0");

    fireEvent.click(decreaseButton);

    expect(
      Number(screen.getByTestId("quantity").textContent)
    ).toBeGreaterThanOrEqual(0);
  });
});
