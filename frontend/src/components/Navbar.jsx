import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const cartItemsCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '1rem 0' }}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="h2 text-gradient">PetLouma</Link>
        
        <ul className="flex items-center gap-6">
          <li><Link to="/shop" style={{ fontWeight: 600 }}>Shop</Link></li>
          
          {user ? (
            <>
              <li><Link to="/cart" className="flex items-center gap-2" style={{ position: 'relative' }}>
                <ShoppingCart size={24} />
                {cartItemsCount > 0 && <span style={{
                  position: 'absolute', top: '-8px', right: '-12px',
                  background: 'var(--primary)', color: 'white', borderRadius: '50%',
                  padding: '2px 6px', fontSize: '0.75rem', fontWeight: 'bold'
                }}>{cartItemsCount}</span>}
              </Link></li>
              <li><button onClick={logout} className="flex items-center gap-2"><LogOut size={20} /> Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="flex items-center gap-2"><User size={20} /> Login</Link></li>
              <li><Link to="/register" className="btn-primary">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
