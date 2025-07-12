import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', address: '', card: '' });

  const tax = cartTotal * 0.1;
  const total = cartTotal + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed!');
    clearCart();
    navigate('/store');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Card Info"
          value={form.card}
          onChange={(e) => setForm({ ...form, card: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <div className="font-semibold text-right">Subtotal: ${cartTotal.toFixed(2)}</div>
        <div className="font-semibold text-right">Tax: ${tax.toFixed(2)}</div>
        <div className="font-bold text-right">Total: ${total.toFixed(2)}</div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Place Order
        </button>
      </form>
    </div>
  );
}
