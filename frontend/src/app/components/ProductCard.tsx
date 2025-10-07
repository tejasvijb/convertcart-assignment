import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <h3 className="font-semibold">{product.title}</h3>
      <p>Price: ₹{product.price}</p>
      <p>Status: {product.stock_status}</p>
      <p>Category: {product.category}</p>
      <p>On Sale: {product.on_sale ? "Yes" : "No"}</p>
    </div>
  );
}
