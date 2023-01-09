import { screen, render, waitFor } from "@testing-library/react";
import { Server } from "miragejs";
import Home from "../pages";
import { makeServer } from "../services/miragejs/server";

describe("ProductList", () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
    render(<Home />);
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should render ProductList", () => {
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });

  it("should render the ProductCard component 12 times", async () => {
    server.createList("product", 12);
    render(<Home />);

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(12);
    });
  });

  it("should render the no products message", async () => {
    await waitFor(() => {
      expect(screen.getByText(/No products was found/i)).toBeInTheDocument();
    });
  });

  it.todo("should render the Search component");

  it.todo("should filter the product list when a search is performed");

  it.todo("should display error message when promise rejects");

  it.todo("should display the total quantity of products");

  it.todo("should display product (singular) when there is only 1 product");
});
