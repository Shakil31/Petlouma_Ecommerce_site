import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container animate-fade-in" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2 className="h2" style={{ marginBottom: '1rem' }}>Your Cart is Empty</h2>
        <p className="text-light" style={{ marginBottom: '2rem' }}>Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 24px' }}>
      <h1 className="h2" style={{ marginBottom: '2rem' }}>Shopping Cart</h1>
      
      <div className="flex gap-8" style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.items.map(item => (
            <div key={item.id} className="card flex items-center gap-4" style={{ padding: '1rem' }}>
              <img 
                src={item.product_details.image || "https://placehold.co/100x100?text=pet"} 
                alt={item.product_details.name} 
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />
              <div style={{ flex: 1 }}>
                <Link to={`/product/${item.product}`} style={{ fontWeight: 600, fontSize: '1.1rem' }}>{item.product_details.name}</Link>
                <p className="text-light">Qty: {item.quantity}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>${item.total_price}</p>
                <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--primary)', border: 'none', background: 'none', cursor: 'pointer', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="card" style={{ flex: '1 1 300px', padding: '2rem' }}>
          <h3 className="h3" style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Order Summary</h3>
          <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
            <span className="text-light">Subtotal</span>
            <span style={{ fontWeight: 600 }}>${cart.total_price}</span>
          </div>
          <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
            <span className="text-light">Shipping</span>
            <span style={{ fontWeight: 600 }}>Calculated at checkout</span>
          </div>
          <div className="flex justify-between" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
            <span className="h3">Total</span>
            <span className="h3 text-primary">${cart.total_price}</span>
          </div>
          
          <button 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
