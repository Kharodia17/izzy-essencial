import { useEffect, useState } from "react";
import { subscribeCategories } from "../firebase/categories.js";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeCategories((data) => {
      setCategories(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  return { categories, loading };
}
