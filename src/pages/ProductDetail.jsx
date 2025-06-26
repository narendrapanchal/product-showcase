import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="p-4">Loading product...</p>;
  if (!product) return <p className="p-4 text-red-500">Product not found.</p>;

  return (
    <>
      <div className="p-4 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/3 h-auto object-contain"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-lg text-gray-600 mb-2">₹{product.price}</p>
            <p className="text-yellow-600 mb-2">Rating: {product.rating?.rate} ⭐</p>
            <p className="mb-4">{product.description}</p>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => alert('Product added to cart! (dummy action)')}
            >
              Add to Cart
            </button>
            <div className="mt-4">
              <Link to="/" className="text-blue-600 underline text-sm">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
