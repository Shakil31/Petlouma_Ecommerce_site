import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`shop/products/${id}/`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}><h3 className="h3">Loading...</h3></div>;
  if (!product) return <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}><h3 className="h3">Product not found.</h3></div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 24px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '2rem', color: 'var(--text-light)', fontWeight: 600 }}>&larr; Back</button>
      <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <img 
              src={product.image || "https://placehold.co/600x600?text=No+Image"} 
              alt={product.name}
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <p className="text-light" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{product.category_name}</p>
            <h1 className="h1">{product.name}</h1>
            <p className="h2 text-primary" style={{ marginTop: '1rem' }}>${product.price}</p>
          </div>
          
          <p className="text-light" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            {product.description || "No description available for this premium product."}
          </p>
          
          <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid #eee' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
              <span style={{ fontWeight: 600 }}>Availability:</span>
              <span style={{ color: product.stock > 0 ? '#40c057' : '#fa5252', fontWeight: 600 }}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <button 
              className="btn-primary" 
              style={{ width: '100%', padding: '1rem' }}
              onClick={() => addToCart(product.id)}
              disabled={product.stock === 0}
            >
              <ShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
