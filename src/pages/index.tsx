import Head from "next/head";
import { ProductCard } from "../components/ProductCard";
import { Search } from "../components/Search";

interface Product {
  title: string;
  price: string;
  image: string;
}

export default function Home() {
  const product: Product = { title: "", image: "", price: "" };
  function doSearch() {}
  function addToCart() {}

  return (
    <>
      <Head>
        <title>Watch Store</title>
      </Head>

      <main className="my-8">
        <Search doSearch={doSearch} />
        <div className="container mx-auto px-6">
          <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
          <span className="mt-3 text-sm text-gray-500">200+ Products</span>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard product={product} addToCart={addToCart} />
          </div>
        </div>
      </main>
    </>
  );
}
