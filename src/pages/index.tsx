import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Search } from "../components/Search";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<Boolean>(false);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data.products))
      .catch((er) => setError(true));
  }, []);

  function doSearch() {}
  function addToCart() {}

  return (
    <>
      <Head>
        <title>Watch Store</title>
      </Head>

      <main className="my-8" data-testid="product-list">
        <Search doSearch={doSearch} />
        <div className="container mx-auto px-6 mt-4">
          <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
          <span className="mt-3 text-sm text-gray-500">200+ Products</span>
          <div className="mt-4 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {error
              ? "No products was found"
              : products.map((product) => (
                  <ProductCard
                    product={product}
                    key={product.id}
                    addToCart={addToCart}
                  />
                ))}
          </div>
        </div>
      </main>
    </>
  );
}
