import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Header from "./Header";
import Login from "./Login";
import Carousel from "./Carousel";


import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";

import AddProduct from "./AddProduct";
import ViewProducts from "./ViewProducts";
import EditProduct from "./EditProduct";
import ManageUsers from "./ManageUsers";
import EditUser from "./EditUser";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Checkout from "./Checkout";
import OrderManagement from "./OrderManagement";
import OrderSuccess from "./OrderSuccess";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const location = useLocation();

  const isFullpage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/product") ||
    location.pathname.startsWith("/checkout")||
      location.pathname.startsWith("/user");

  return (
    <>
      {!isFullpage && (
        <Header onSignupClick={() => setShowLogin(true)} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carousel />
              <Products />
            </>
          }
        />

        <Route path="/user" element={<UserPanel />} />

       

        <Route path="/admin" element={<AdminPanel />} />

        <Route path="/admin/add" element={<AddProduct />} />
        <Route path="/admin/view" element={<ViewProducts />} />
        <Route path="/admin/edit/:id" element={<EditProduct />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/edit-user/:id" element={<EditUser />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>

      {showLogin && (
        <Login onClose={() => setShowLogin(false)} />
      )}
    </>
  );
}

export default App;