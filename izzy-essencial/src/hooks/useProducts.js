import { useEffect, useState } from "react";
import { subscribeProducts } from "../firebase/products.js";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  return { products, loading };
}
