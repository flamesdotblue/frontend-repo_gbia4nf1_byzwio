import { ShoppingCart, Store } from "lucide-react";

export default function Header({ search, onSearchChange, cartCount }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 text-blue-600">
          <Store className="w-6 h-6" />
          <span className="font-extrabold text-xl tracking-tight">ShopEase</span>
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for products, brands, and more"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-blue-600 text-white rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
