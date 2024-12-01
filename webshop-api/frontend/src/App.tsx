import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      <Route path="/categories/:id" element={<CategoryPage />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  </Router>
);

export default App;
