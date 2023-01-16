import Head from "next/head";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Search } from "../components/Search";
import { Product, useFetchProducts } from "../hooks/useFetchProducts";
import { useCartStore } from "../store/cart";

export default function Home() {
  const { products, error } = useFetchProducts();
  const [term, setTerm] = useState("");
  const [localProducts, setLocalProducts] = useState<Product[]>([]);

  const addToCart = useCartStore(({ actions }) => actions.add);

  useEffect(() => {
    if (term === "") {
      setLocalProducts(products);
    } else {
      setLocalProducts(
        products.filter(({ title }) => {
          return title.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
      );
    }
  }, [products, term]);

  function renderErrorMessage() {
    if (!error) return;

    return <h4 data-testid="server-error">Server is down</h4>;
  }

  function renderProductListOrMessage() {
    if (localProducts.length === 0 && !error) {
      return <h4 data-testid="no-products">No products was found</h4>;
    }

    return localProducts.map((product) => (
      <ProductCard product={product} key={product.id} addToCart={addToCart} />
    ));
  }

  function renderProductQuantity() {
    return localProducts.length === 1
      ? "1 Product"
      : `${localProducts.length} Products`;
  }

  return (
    <>
      <Head>
        <title>Watch Store</title>
      </Head>

      <main className="my-8" data-testid="product-list">
        <Search doSearch={(term) => setTerm(term)} />
        <div className="container mx-auto px-6 mt-4">
          <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
          <span className="mt-3 text-sm text-gray-500">
            {renderProductQuantity()}
          </span>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {renderErrorMessage()}
            {renderProductListOrMessage()}
          </div>
        </div>
      </main>
    </>
  );
}
