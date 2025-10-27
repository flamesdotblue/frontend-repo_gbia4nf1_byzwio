export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </p>
        <p className="text-gray-400">Built for a fast, delightful shopping experience.</p>
      </div>
    </footer>
  );
}
