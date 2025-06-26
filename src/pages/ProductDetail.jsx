import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (product) {
      const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
      setInCart(cart.some((item) => item.id === product.id));
    }
  }, [product]);

  const handleAddToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    if (!cart.some((item) => item.id === product.id)) {
      cart.push({ ...product, quantity: 1 });
      sessionStorage.setItem('cart', JSON.stringify(cart));
      setInCart(true);
    }
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  if (loading) return <p className="p-4">Loading product...</p>;
  if (!product) return <p className="p-4 text-red-500">Product not found.</p>;

  return (
    <div className="min-h-screen bg-[#f1f3f6] py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-8 flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/3 h-auto object-contain bg-[#f5f5f5] rounded p-4"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-gray-900">{product.title}</h1>
            <p className="text-xl text-gray-800 font-semibold mb-2">₹{Math.round(product.price * 80)}</p>
            <p className="text-yellow-600 mb-2 font-medium">Rating: {product.rating?.rate} <span className="text-yellow-500">⭐</span></p>
            <p className="mb-4 text-gray-700">{product.description}</p>
          </div>
          <div>
            {inCart ? (
              <button
                className="bg-[#2874f0] text-white px-6 py-3 rounded font-bold hover:bg-[#1856b8] w-full mt-2"
                onClick={handleGoToCart}
              >
                Go to Cart
              </button>
            ) : (
              <button
                className="bg-green-600 text-white px-6 py-3 rounded font-bold hover:bg-green-700 w-full mt-2"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            )}
            <div className="mt-4">
              <Link to="/" className="text-blue-600 underline text-sm">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
