import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Products from './components/Products/Products';
import NewProduct from './components/Products/NewProduct';
import ViewProduct from './components/Products/ViewProducts';
import Favourites from './components/Products/Favourites/Favourites';
import ProductDetail from './components/Products/ProductItem/ProductDetail';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import './style.css';

export default function App() {
  const [isCartOpen, setCartIsOpen] = useState();

  const showCartHandler = () => {
    setCartIsOpen(true);
  };

  const hideCartHandler = () => {
    setCartIsOpen(false);
  };
  return (
    <div>
      {isCartOpen && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route
            path="/product-detail/:productId"
            element={<ProductDetail />}
          />
          <Route path="/new-product" element={<NewProduct />} />
          <Route path="/view-product" element={<ViewProduct />} />
          <Route path="/favourite-products" element={<Favourites />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
