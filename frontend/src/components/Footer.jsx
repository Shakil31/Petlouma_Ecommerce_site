import React from 'react';

const Footer = () => {
  return (
    <footer style={{ marginTop: '4rem', padding: '3rem 0', borderTop: '1px solid #eee', background: 'white' }}>
      <div className="container flex flex-col items-center justify-center gap-4">
        <h2 className="h2 text-gradient">PetLouma</h2>
        <p className="text-light text-center" style={{ maxWidth: '500px' }}>
          Your premium destination for everything your pet desires. Quality products, easy shopping, and happy pets.
        </p>
        <p className="text-light" style={{ fontSize: '0.9rem', marginTop: '2rem' }}>
          &copy; {new Date().getFullYear()} PetLouma E-commerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
