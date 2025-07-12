import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { cartItems, addToCart } = useCart();
  const inCart = cartItems.some((p) => p.id === product.id);

  return (
    <div className="border rounded-md p-4 shadow-sm hover:shadow-lg transition flex flex-col">
      <Link to={`/product/${product.id}`}
        className="flex-grow">
        <img src={product.image} alt={product.name} className="w-full h-40 object-contain mb-2" />
        <h3 className="font-semibold truncate">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.brand}</p>
        <div className="text-yellow-500">{'★'.repeat(product.rating)}</div>
        <p className="text-sm text-gray-500">{product.reviews} reviews</p>
        <p className="font-bold mt-1">${product.price.toFixed(2)}</p>
      </Link>
      <button
        onClick={() => addToCart(product)}
        disabled={inCart}
        className={`mt-2 py-1 rounded-md ${inCart ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'} text-white`}
      >
        {inCart ? 'Added' : 'Add to Cart'}
      </button>
    </div>
  );
}
