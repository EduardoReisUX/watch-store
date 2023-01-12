import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Response, Server } from "miragejs";
import Home from "../pages";
import { makeServer } from "../services/miragejs/server";

describe("ProductList", () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should render ProductList", () => {
    render(<Home />);
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
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText(/No products was found/i)).toBeInTheDocument();
      expect(screen.getByTestId("no-products")).toBeInTheDocument();
    });
  });

  it("should display error message when promise rejects", async () => {
    server.get("products", () => {
      return new Response(500, {}, "");
    });
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId("server-error")).toBeInTheDocument();
      expect(screen.queryByTestId("no-products")).toBeNull();
      expect(screen.queryAllByTestId("product-card")).toHaveLength(0);
    });
  });

  it("should render the Search component", () => {
    render(<Home />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("should filter the product list when a search is performed", async () => {
    const searchTerm = "Relógio bonito";
    server.createList("product", 2);

    server.create("product", {
      // @ts-ignore
      title: searchTerm,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(3);
    });

    const form = screen.getByRole("form");
    const input = screen.getByRole("searchbox");

    await userEvent.type(input, searchTerm);
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(1);
      expect(screen.getByText(/Relógio bonito/i)).toBeInTheDocument();
    });
  });

  it("should display the total quantity of products", async () => {
    server.createList("product", 10);
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/^10 Products$/i)).toBeInTheDocument();
    });
  });

  it("should display product (singular) when there is only 1 product", async () => {
    server.create("product");
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/^1 Product$/i)).toBeInTheDocument();
    });
  });

  it("should display proper quantity when list is filtered", async () => {
    const searchTerm = "Relógio bonito";
    server.createList("product", 2);

    server.create("product", {
      // @ts-ignore
      title: searchTerm,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/^3 Products$/i)).toBeInTheDocument();
    });

    const form = screen.getByRole("form");
    const input = screen.getByRole("searchbox");

    await userEvent.type(input, searchTerm);
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/^1 Product$/i)).toBeInTheDocument();
    });
  });
});
