import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Checkout = () => {
  const { cart, fetchCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!address) return;
    setLoading(true);
    try {
      await api.post('orders/', { shipping_address: address });
      await fetchCart();
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      console.error("Checkout failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container animate-fade-in flex flex-col items-center justify-center" style={{ minHeight: '60vh', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#40c057', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '2rem' }}>✓</div>
        <h1 className="h1 text-gradient">Order Placed Successfully!</h1>
        <p className="text-light" style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Thank you for shopping with PetLouma. We're processing your order.</p>
        <p className="text-light" style={{ marginTop: '0.5rem' }}>Redirecting to home...</p>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 24px' }}>
      <h1 className="h2" style={{ marginBottom: '2rem' }}>Checkout securely</h1>
      
      <div className="flex gap-8" style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <form onSubmit={handleCheckout} className="card" style={{ flex: '1 1 500px', padding: '2rem' }}>
          <h3 className="h3" style={{ marginBottom: '1.5rem' }}>Shipping Information</h3>
          <div className="input-group">
            <label>Full Delivery Address</label>
            <textarea 
              className="input-field" 
              rows="4" 
              required
              placeholder="e.g. 123 Main St, Apt 4B, City, Country, ZIP"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>
          
          <h3 className="h3" style={{ marginBottom: '1.5rem', marginTop: '2rem' }}>Payment Method</h3>
          <div style={{ padding: '1rem', border: '1px solid #eee', borderRadius: 'var(--radius-md)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input type="radio" checked readOnly />
            <div>
              <p style={{ fontWeight: 600 }}>Mock Payment / Cash on Delivery</p>
              <p className="text-light" style={{ fontSize: '0.9rem' }}>Standard testing flow selected.</p>
            </div>
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={loading}>
            {loading ? 'Processing...' : `Pay $${cart.total_price}`}
          </button>
        </form>
        
        <div className="card" style={{ flex: '1 1 350px', padding: '2rem', background: '#fafafa' }}>
          <h3 className="h3" style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Order Summary</h3>
          {cart.items.map(item => (
            <div key={item.id} className="flex justify-between" style={{ marginBottom: '1rem' }}>
              <div>
                <span style={{ fontWeight: 500 }}>{item.product_details.name}</span>
                <span className="text-light" style={{ display: 'block', fontSize: '0.9rem' }}>Qty: {item.quantity}</span>
              </div>
              <span style={{ fontWeight: 600 }}>${item.total_price}</span>
            </div>
          ))}
          <div className="flex justify-between" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #ddd' }}>
            <span className="h3">Total</span>
            <span className="h3 text-primary">${cart.total_price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
