import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, cartTotal } = useCart();

  return (
    <div className="space-y-4">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center border p-2 rounded">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold">Subtotal: ${cartTotal.toFixed(2)}</div>
          <Link
            to="/checkout"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
}
