import { fireEvent, render, screen } from "@testing-library/react";
import { ProductCard } from "../components/ProductCard";

const product = {
  title: "Relógio bonito",
  price: "22.00",
  image: "asd",
};

const addToCart = jest.fn();

describe("ProductCard", () => {
  beforeEach(() => {
    render(<ProductCard product={product} addToCart={addToCart} />);
  });

  it("should render ProductCard", () => {
    expect(screen.getByTestId("product-card")).toBeInTheDocument();
  });

  it("should display proper content", () => {
    expect(screen.getByText(/Relógio bonito/i)).toBeInTheDocument();
    expect(screen.getByText(/22.00/i)).toBeInTheDocument();
    expect(screen.getByTestId("image")).toHaveStyle({
      backgroundImage: product.image,
    });
  });

  it("should call props.addToCart() when button is clicked", () => {
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product);
  });
});
