"use client";

import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { Product } from "@/types/product";
import axiosClient from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import SegmentEditorDialog from "./components/SegmentEditorDialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("Fetching products from:", process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL);
      const response = await axiosClient.get(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="font-sans min-h-screen bg-gray-50 p-4">
      <div className="flex flex-col max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <div className="flex gap-2">
            <SegmentEditorDialog setProducts={setProducts} onReset={fetchProducts} />

            <Button variant="outline" onClick={fetchProducts} disabled={loading}>
              <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Reset
            </Button>
          </div>
        </div>

        {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
