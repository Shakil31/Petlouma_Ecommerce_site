import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.image || product.image_url || "https://placehold.co/400x300?text=No+Image"} 
          alt={product.name}
          style={{ width: '100%', height: '220px', objectFit: 'cover' }}
        />
      </Link>
      <div style={{ padding: '1.5rem' }}>
        <p className="text-light" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          {product.category_name}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="h3" style={{ marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between" style={{ marginTop: '1rem' }}>
          <span className="h3 text-primary">${product.price}</span>
          <button 
            className="btn-primary" 
            style={{ padding: '0.5rem 1rem' }}
            onClick={() => addToCart(product.id)}
          >
            <ShoppingCart size={18} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
