import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await api.get('shop/products/');
        setProducts(prodRes.data);
      } catch (error) {
        console.error("Error loading shop data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}><h3 className="h3">Loading products...</h3></div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 24px' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="h1" style={{ marginBottom: '1rem' }}>All Products</h1>
        <p className="text-light">Browse our entire catalogue of premium pet goods.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)' }}>
          <h3 className="h3 text-light">No products available.</h3>
        </div>
      )}
    </div>
  );
};

export default Shop;
