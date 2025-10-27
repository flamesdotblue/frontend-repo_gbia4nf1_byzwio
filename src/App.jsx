import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import CategoryTabs from "./components/CategoryTabs";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  // Seed demo products on first load, then fetch
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        // Try seeding (no-op if already have data)
        await fetch(`${API_URL}/api/seed`, { method: "POST" }).catch(() => {});
        await fetchCategories();
        await fetchProducts();
      } catch (e) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch(`${API_URL}/api/categories`);
    const data = await res.json();
    setCategories(data);
  };

  const fetchProducts = async (opts = {}) => {
    const params = new URLSearchParams();
    if (opts.category) params.set("category", opts.category);
    if (opts.q) params.set("q", opts.q);
    const res = await fetch(`${API_URL}/api/products?${params.toString()}`);
    const data = await res.json();
    setProducts(data);
  };

  // Whenever filters change, refetch
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      fetchProducts({ category: selectedCategory || undefined, q: search || undefined });
    }, 300);
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [selectedCategory, search]);

  const cartCount = useMemo(() => cart.reduce((s, it) => s + it.quantity, 0), [cart]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/40 text-gray-900">
      <Header search={search} onSearchChange={setSearch} cartCount={cartCount} />

      <main>
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Everything you love, in one place
          </h1>
          <p className="text-gray-600 mt-2">Discover clothes, food, electronics, home goods and more.</p>
        </div>

        <CategoryTabs
          categories={categories}
          current={selectedCategory}
          onChange={setSelectedCategory}
        />

        {loading ? (
          <div className="max-w-6xl mx-auto px-4 py-20 text-center text-gray-500">Loading products…</div>
        ) : error ? (
          <div className="max-w-6xl mx-auto px-4 py-20 text-center text-red-600">{error}</div>
        ) : (
          <ProductGrid products={products} onAdd={handleAddToCart} />
        )}
      </main>

      <Footer />
    </div>
  );
}
