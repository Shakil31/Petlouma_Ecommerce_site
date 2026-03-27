# PetLouma E-commerce Platform 🐾

A modern, full-stack pet shop e-commerce platform featuring a robust Django REST backend and a vibrant, interactive React.js (Vite) frontend.

## 📁 Project Structure

This repository is split into two primary environments:

- **`backend/`**: Powered by the Django REST Framework. Serves the REST API endpoints and manages the database.
  - Custom User Authentication using JWT (JSON Web Tokens).
  - `shop` app managing Categories and Products.
  - `orders` app managing Shopping Carts, Cart Items, and the complete Checkout workflow.
- **`frontend/`**: Powered by React.js & Vite.
  - Implements global session state via Context APIs (`AuthContext` & `CartContext`).
  - Styled with a hand-written, premium Vanilla CSS design system incorporating glassmorphism, CSS variables, and dynamic micro-animations.

## ✨ Features

- **Secure Accounts**: Complete register & login user flow.
- **Dynamic Catalog**: Browse a wide array of premium pet products safely served from the backend.
- **Connected Cart**: Add items, delete items, and track total cost in real time.
- **Checkout Simulator**: Mock payment and submission processor that securely saves historical orders.

## 🚀 Quick Start Guide

You will need to run the backend and frontend simultaneously in two separate terminals.

### 1. Launch the Backend
Open a terminal and navigate to the project directory:
```bash
cd PetLouma/backend

# Initialize and activate the virtual environment (Windows)
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install required dependencies
pip install -r requirements.txt

# Run migrations (already done locally, but good for fresh installs)
python manage.py makemigrations
python manage.py migrate

# (Optional) Populate the database with premium mock pet products
python populate_db.py

# Start the server (runs on Port 8000)
python manage.py runserver
```

### 2. Launch the Frontend
Open a second terminal and navigate to the frontend directory:
```bash
cd PetLouma/frontend

# Install node dependencies
npm install

# Start the Vite development server (runs on Port 5173 by default)
npm run dev
```

Visit the frontend server in your browser (usually `http://localhost:5173/`) and test it out! 

*(Ensure both servers are running so the frontend can securely connect to `localhost:8000` via Axios APIs).*
