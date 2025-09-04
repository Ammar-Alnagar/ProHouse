import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../api';

function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const processPayment = async () => {
    setLoading(true); setError(''); setOrderId('');
    try {
      const resp = await apiPost('/payment/process', { amount: total, email: 'guest@example.com', phoneNo: '0000000000' });
      const { paytmParams } = resp;
      const oid = paytmParams.ORDER_ID;
      // Simulate callback immediately in mock mode
      await fetch('/api/v1/callback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ORDERID: oid }) });
      setOrderId(oid);
      // Create order (guest) using the generated payment id
      const orderItems = items.map(it => ({ name: it.name, price: it.price, quantity: it.quantity, image: it.image, product: it._id }));
      await apiPost('/order/new', {
        shippingInfo: { address: 'N/A', city: 'N/A', state: 'N/A', country: 'N/A', pincode: 0, phoneNo: 0 },
        orderItems,
        paymentInfo: { id: oid, status: 'TXN_SUCCESS' },
        totalPrice: total,
      });
      localStorage.removeItem('cart');
      setItems([]);
    } catch (e) {
      setError(e.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const remove = (id) => {
    const next = items.filter(i => i._id !== id);
    setItems(next);
    localStorage.setItem('cart', JSON.stringify(next));
  };

  if (!items.length) return <div className="container text-white py-5">Your cart is empty.</div>;

  return (
    <div className="container text-white py-5">
      <h2>Cart</h2>
      {error && <div className="text-danger my-2">{error}</div>}
      <ul className="list-group mb-3">
        {items.map((it) => (
          <li key={it._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{it.name}</strong>
              <div className="text-secondary">Qty: {it.quantity}</div>
            </div>
            <div>
              ${(it.price * it.quantity).toFixed(2)}
              <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => remove(it._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mb-3">Total: <strong>${total.toFixed(2)}</strong></div>
      <button className="btn btn-primary" onClick={processPayment} disabled={loading}>
        {loading ? 'Processing...' : 'Checkout (Mock)'}
      </button>
      {orderId && <div className="mt-3">Order placed successfully. Order ID: <code>{orderId}</code></div>}
    </div>
  );
}

export default Cart;
