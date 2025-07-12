import { useState } from 'react';
import { categories } from '../data/categories';

export default function Sidebar() {
  const [selected, setSelected] = useState(null);

  return (
    <aside className="w-48 bg-gray-100 p-4 hidden md:block">
      <h2 className="font-semibold mb-2">Departments</h2>
      <ul className="space-y-1">
        {categories.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => setSelected(c.id)}
              className={`block w-full text-left hover:underline ${selected === c.id ? 'font-bold' : ''}`}
            >
              {c.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
