import React, { useEffect, useState } from "react";
import Search from "../../Product/Search";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import Dropdown from "../../Categories/Dropdown";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";
const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <nav className="flex flex-col">
      <div className="flex justify-between py-2 items-center border-b-2 border-gray-300 bg-white min-[1076px]:px-[8vmax] px-[2vmax] w-full">
        <NavLink
          to="/"
          className="text-3xl max-[500px]:text-[1.5rem] font-bold brand pb-[0.5rem] text-blue-800"
        >
          Beaworth
        </NavLink>
        <div className="ml-[4.5rem] max-[1075px]:hidden">
          <Search />
        </div>
        <div className="flex gap-8 max-[500px]:gap-2 ml-[4.5rem]">
          {isAuthenticated ? (
            <UserOptions user={user} />
          ) : (
            <NavLink
              to={isAuthenticated ? "/account" : "/login"}
              className="flex flex-col justify-center items-center text-gray-500 text-[1.25rem]"
            >
              <PersonIcon />
              <span className="text-[1rem]">Login</span>
            </NavLink>
          )}
          <NavLink
            to="/orders"
            className="flex flex-col justify-center items-center text-gray-500 text-[1.25rem] max-[620px]:hidden"
          >
            <FavoriteIcon />
            <span className="text-[1rem]">Orders</span>
          </NavLink>
          <NavLink
            to="/cart"
            className="flex flex-col justify-center items-center text-gray-500 text-[1.25rem] max-[550px]:hidden"
          >
            <ShoppingCartIcon />
            <span className="text-[1rem]">Cart</span>
          </NavLink>
        </div>
      </div>
      <div className="flex justify-between py-2 min-[675px]:px-[8vmax] px-[2vmax] items-center border-b-2 border-gray-300 bg-white w-full">
        <div className="max-[1075px]:hidden">
          <Dropdown />
        </div>
        <NavLink to="/seller/application" className="max-[1075px]:hidden">
          Become a seller
        </NavLink>
        <div className="flex w-full h-full justify-center item-center min-[1075px]:hidden">
          <Search />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
