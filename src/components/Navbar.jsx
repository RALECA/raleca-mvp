import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <Link to="/store" className="text-2xl font-bold">
        MedMarket
      </Link>
      <input
        type="text"
        placeholder="Search medical supplies..."
        className="mx-4 flex-grow max-w-xl px-3 py-1 rounded text-black"
      />
      <nav className="flex items-center space-x-4">
        {user ? (
          <span>Hello, {user.username}</span>
        ) : (
          <Link to="/login">Sign In</Link>
        )}
        <Link to="/orders">Orders</Link>
        <Link to="/cart" className="relative">
          <span>Cart</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-yellow-500 text-black text-xs rounded-full px-1">
              {cartItems.length}
            </span>
          )}
        </Link>
        {user && (
          <button onClick={() => { logout(); navigate('/login'); }}>
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
}
