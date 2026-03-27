import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('shop/products/');
        setFeaturedProducts(res.data.slice(0, 4)); // Show top 4
      } catch (error) {
        console.error("Error fetching featured products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="container flex flex-col items-center gap-6">
          <h1 className="h1">
            Treat Your Pet to the <span className="text-gradient">Very Best</span>
          </h1>
          <p className="text-light" style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
            Discover premium pet supplies, toys, and healthy treats that keep your furry friends happy and thriving.
          </p>
          <div className="flex gap-4" style={{ marginTop: '1rem' }}>
            <Link to="/shop" className="btn-primary">Shop Now</Link>
            <Link to="/register" className="btn-outline">Join the Family</Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container" style={{ padding: '4rem 24px' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
          <h2 className="h2">Featured Products</h2>
          <Link to="/shop" style={{ fontWeight: 600, color: 'var(--primary)' }}>View All &rarr;</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {featuredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)' }}>
            <p className="text-light">Backend is currently empty. Add products from Django Admin!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
