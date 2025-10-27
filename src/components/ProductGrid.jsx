function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-md transition">
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-sm">
        {/* Image placeholder */}
        <span className="group-hover:scale-105 transition">{product.category}</span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
        {product.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">{product.description}</p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-blue-600">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            disabled={!product.in_stock}
          >
            {product.in_stock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({ products, onAdd }) {
  if (!products.length) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-500">
        No products found. Try a different search or category.
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}
