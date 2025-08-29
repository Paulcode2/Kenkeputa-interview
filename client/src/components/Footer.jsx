import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      <div>
        <img
          src={assets.logo}
          className="w-[70px] rounded-full"
          alt=""
        />
        <p className="w-full md:w-2/3 text-gray-600">
          Copyright © 2025
          <span> </span>
          <span className="text-darkBlue font-semibold">TFAWE</span> all rights
          reserved.
        </p>
      </div>
      <div>
        <p className="text-xl font-medium mb-5 ">Company</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/about">
            <li>About Us</li>
          </NavLink>
          <NavLink to="/collection">
            <li>Collection</li>
          </NavLink>
        </ul>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+234 123 4565 7899</li>
          <li>mail@tfawecustom.com</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
