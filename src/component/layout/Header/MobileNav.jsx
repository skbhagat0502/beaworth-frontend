import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import HouseIcon from "@mui/icons-material/House";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import "./MobileNav.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const MobileNav = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <ul className="flex min-[600px]:hidden justify-evenly bg-blue-600 pt-2 rounded-t-[1rem] fixed bottom-0 w-full">
      <NavLink
        to="/"
        className="text-white flex justify-center items-center flex-col"
      >
        <i className="text-blue-600 text-[2rem] bg-white rounded-full w-[50px] h-[50px] grid place-items-center">
          <HouseIcon fontSize="2rem" />
        </i>
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/products"
        className="text-white flex justify-center items-center flex-col"
      >
        <i className="text-blue-600 text-[2rem] bg-white rounded-full w-[50px] h-[50px] grid place-items-center">
          <Inventory2RoundedIcon fontSize="2rem" />
        </i>
        <span>Shops</span>
      </NavLink>
      <NavLink
        to="/cart"
        className="text-white flex justify-center items-center flex-col"
      >
        <i className="text-blue-600 text-[2rem] bg-white rounded-full w-[50px] h-[50px] grid place-items-center">
          <ShoppingCartIcon fontSize="2rem" />
        </i>
        <span>Cart</span>
      </NavLink>
      <NavLink
        to="/contact"
        className="text-white flex justify-center items-center flex-col"
      >
        <i className="text-blue-600 text-[2rem] bg-white rounded-full w-[50px] h-[50px] grid place-items-center">
          <ContactPhoneRoundedIcon fontSize="2rem" />
        </i>
        <span>Help</span>
      </NavLink>
      <NavLink
        to={isAuthenticated ? "/account" : "/login"}
        className="text-white flex justify-center items-center flex-col"
      >
        <i className="text-blue-600 text-[2rem] bg-white rounded-full w-[50px] h-[50px] grid place-items-center">
          <AccountBoxRoundedIcon fontSize="2rem" />
        </i>
        <span>Account</span>
      </NavLink>
    </ul>
  );
};

export default MobileNav;
