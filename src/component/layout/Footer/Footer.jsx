import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer id="footer" className="max-[500px]:mb-8">
      <div className="footer">
        <div className="first">
          <NavLink
            to="/"
            className="text-xl font-bold brand px-4 pb-[0.5rem] text-blue-800"
          >
            Beaworth
          </NavLink>
          <p className="text-gray-500"> &copy; {year} All Rights Reserved.</p>
          <p className="text-gray-500">Sindri Town Dhanbad Jharkhand</p>
        </div>
        <div className="second">
          <h3 className="text-black">Contact us</h3>
          <p className="text-gray-500">Get in touch</p>
          <p className="text-gray-500">Open your shop</p>
          <p className="text-gray-500">Logistic partner</p>
        </div>
        <div className="third">
          <h3 className="text-black">Legal</h3>
          <p className="text-gray-500">Terms & Conditions</p>
          <p className="text-gray-500">Privacy policy</p>
          <p className="text-gray-500">Cookie policy</p>
          <p className="text-gray-500">Return & refund policy</p>
        </div>
        <div className="fourth">
          <h3 className="text-black">Important Links</h3>
          <p className="text-gray-500">Home</p>
          <p className="text-gray-500">About</p>
          <p className="text-gray-500">Beaworth Seller</p>
          <p className="text-gray-500">Return & refund policy</p>
        </div>
      </div>
      <div className="bg-[#f5f5f5] flex justify-center items-center w-full py-4 text-gray-500">
        <p>&copy; {year} Beaworth</p>
      </div>
    </footer>
  );
};

export default Footer;
