import axios from "axios";
import { useState, useEffect } from "react";

export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
}

interface DataResponse {
  products: Product[];
}

export function useFetchProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<Boolean>(false);

  async function getProducts() {
    let { data } = await axios.get<DataResponse>("/api/products");

    if (!data.products || data.products.length == 0) {
      setError(true);
    } else {
      setProducts(data.products);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return { products, error };
}
