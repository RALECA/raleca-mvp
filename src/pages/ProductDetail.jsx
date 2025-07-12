import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { cartItems, addToCart } = useCart();
  const inCart = cartItems.some((p) => p.id === product.id);

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="md:flex space-y-4 md:space-x-8">
      <img src={product.image} alt={product.name} className="w-72 h-72 object-contain" />
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <p className="text-gray-600">{product.brand}</p>
        <div className="text-yellow-500">{'★'.repeat(product.rating)}</div>
        <p>{product.reviews} reviews</p>
        <p>Stock: {product.stock}</p>
        <p className="font-bold text-xl">${product.price.toFixed(2)}</p>
        <button
          onClick={() => addToCart(product)}
          disabled={inCart}
          className={`mt-2 px-4 py-2 rounded-md ${inCart ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'} text-white`}
        >
          {inCart ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
