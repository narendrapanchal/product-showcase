import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    sessionStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleQuantityChange = (id, delta) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 1 ? newQuantity : 1 };
      }
      return item;
    });
    updateCart(newCart);
  };

  const handleRemove = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    updateCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f1f3f6] py-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Cart Items */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">My Cart ({cart.length})</h1>
          {cart.length === 0 ? (
            <p className="text-gray-600">No items in cart.</p>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center sm:items-center justify-between border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image} alt={item.title} className="w-24 h-24 object-contain cursor-pointer border rounded bg-[#f5f5f5] p-2" />
                    </Link>
                    <div className="min-w-0 flex flex-col gap-2">
                      <Link to={`/product/${item.id}`} className="block max-w-xs">
                        <h2
                          className="font-semibold text-gray-900 text-base sm:text-lg truncate group-hover:underline"
                          title={item.title}
                        >
                          {item.title}
                        </h2>
                      </Link>
                      <p className="text-gray-800 font-bold text-lg mt-1">₹{item.price}</p>
                    </div>
                  </div>
                  {/* Controls and price */}
                  <div className="flex flex-col items-center gap-2 w-full sm:w-auto sm:flex-row sm:justify-end sm:items-center mt-4 sm:mt-0">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center shadow-sm rounded overflow-hidden border border-blue-500 bg-white h-10">
                        <button
                          className={`w-8 h-10 border-none font-bold text-lg flex items-center justify-center focus:outline-none ${item.quantity <= 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-500 hover:text-white transition-colors'}`}
                          onClick={() => handleQuantityChange(item.id, -1)}
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                          style={{ borderRight: '1px solid #2874f0', borderRadius: '0' }}
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-base font-medium text-gray-900 bg-white border-none flex items-center justify-center h-10">
                          {item.quantity}
                        </span>
                        <button
                          className="w-8 h-10 bg-white text-blue-600 border-none font-bold text-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors focus:outline-none"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          aria-label="Increase quantity"
                          style={{ borderLeft: '1px solid #2874f0', borderRadius: '0' }}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="px-4 h-10 bg-red-500 text-white rounded font-semibold text-sm hover:bg-red-600 transition-colors"
                        onClick={() => handleRemove(item.id)}
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="text-center sm:text-right w-full sm:w-auto mt-2 sm:mt-0">
                      <p className="font-semibold text-lg text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Summary Card */}
        <div className="w-full md:w-80 bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Price Details</h2>
          <div className="flex justify-between mb-2 text-gray-800">
            <span>Price ({cart.length} items)</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-800">
            <span>Delivery Charges</span>
            <span className="text-green-600 font-semibold">FREE</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between text-lg font-bold text-gray-900 mb-4">
            <span>Total Amount</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-[#2874f0] text-white font-bold py-2 rounded shadow hover:bg-[#1856b8] transition-colors disabled:opacity-60 text-lg"
            disabled
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
