import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, cart, user } = useContext(ShopContext);

  const getCartCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <div className="md:hidden"></div>
      <Link to="/">
        <img
          src={assets.logo}
          className="w-[150px] rounded-full"
          alt=""
        />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1 ">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/pricing" className="flex flex-col items-center gap-1 ">
          <p>PRICING</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>ACCESSORIES</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/book" className="flex flex-col items-center gap-1">
          <p>APPOINTMENT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1 ">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded ">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <Link to="/orders" className="cursor-pointer hover:text-black">Orders</Link>
              <p className="cursor-pointer hover:text-black" onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}>Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          {getCartCount() > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          )}
        </Link>
        {user?.isAdmin && (
          <Link to="/admin" className="ml-4">
            <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
              Admin
            </button>
          </Link>
        )}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-7 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/* Mobile bar */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180 cursor-pointer"
              alt=""
            />
            {/* <p className="cursor-pointer">Back</p> */}
          </div>
          <div className="flex flex-col poppins-regular">
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 text-center"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 text-center"
              to="/pricing"
            >
              PRICING
            </NavLink>

            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 text-center"
              to="/collection"
            >
              ACCESSORIES
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 text-center"
              to="/book"
            >
              APPOINTMENT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 text-center"
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 text-center"
              to="/contact"
            >
              CONTACT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 text-center"
              to="/cart"
            >
              CART
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
