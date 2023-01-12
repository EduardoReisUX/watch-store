import { renderHook } from "@testing-library/react-hooks";
import { Response, Server } from "miragejs";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { makeServer } from "../services/miragejs/server";

type Models = {
  product: {
    id: string;
    title: string;
    price: string;
    image: string;
  };
};

describe("useFetchProducts", () => {
  let server: Server<Models>;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should return a list of 10 products", async () => {
    server.createList("product", 10);

    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());

    await waitForNextUpdate();

    expect(result.current.products).toHaveLength(10);
    expect(result.current.error).toBe(false);
  });

  it("should set error to true when catch() block is executed", async () => {
    server.get("/products", () => {
      return new Response(500, {}, "");
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());

    await waitForNextUpdate();

    expect(result.current.error).toBe(true);
    expect(result.current.products).toHaveLength(0);
  });
});
