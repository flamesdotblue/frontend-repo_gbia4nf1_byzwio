export default function CategoryTabs({ categories, current, onChange }) {
  const items = ["All", ...categories];
  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <div className="flex flex-wrap gap-2">
        {items.map((cat) => {
          const active = (current || "All") === cat;
          return (
            <button
              key={cat}
              onClick={() => onChange(cat === "All" ? null : cat)}
              className={
                "px-3 py-1.5 rounded-full text-sm border transition " +
                (active
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400")
              }
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
