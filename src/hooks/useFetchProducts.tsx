import axios from "axios";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
}

export function useFetchProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<Boolean>(false);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data.products))
      .catch((er) => setError(true));
  }, []);

  return { products, error };
}
