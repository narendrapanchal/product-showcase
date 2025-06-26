import { useCart } from '../context/FilterSortContext';
import Header from '../components/Header';

function Cart() {
  const { cart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-4 rounded"
              >
                <div>
                  <h2 className="font-semibold">{item.title.slice(0, 40)}...</h2>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                </div>
                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
              </div>
            ))}
            <h3 className="text-lg font-bold text-right">Total: ₹{total.toFixed(2)}</h3>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
