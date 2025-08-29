import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Book from "./pages/Book.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Orders from "./pages/Orders.jsx";
import Login from "./pages/Login.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Contact from "./pages/Contact.jsx";
import Collection from "./pages/Collection.jsx";
import Cart from "./pages/Cart.jsx";
import Product from "./pages/Product.jsx";
import Admin from "./pages/Admin.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Pricing from "./pages/Pricing.jsx";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const publicPaths = ["/login"];
    if (!token && !publicPaths.includes(location.pathname)) {
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  return (
    <AnimatePresence mode="wait">
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <NavBar />
        <SearchBar />
        <Routes location={location} key={location.pathname}>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/place" element={<PlaceOrder />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </AnimatePresence>
  );
};

export default App;
