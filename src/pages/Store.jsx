import { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Store() {
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex space-x-2"
      >
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow border px-3 py-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 rounded">Search</button>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
