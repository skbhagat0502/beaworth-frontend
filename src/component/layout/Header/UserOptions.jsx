import React, { Fragment, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const success = useSelector((state) => state.logout);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
    handleClose();
  }

  function orders() {
    navigate("/orders");
    handleClose();
  }

  function account() {
    navigate("/account");
    handleClose();
  }

  function cart() {
    navigate("/cart");
    handleClose();
  }

  function logoutUser() {
    dispatch(logout());
    if (success) {
      toast.success("Logout Successfully");
    }
    handleClose();
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <div
        onClick={handleClick}
        className="cursor-poiter flex items-center text-[1rem]"
      >
        <p className="flex flex-col justify-center items-center cursor-pointer text-gray-500">
          <PersonIcon />
          {user && user.name.split(" ")[0]}
        </p>
      </div>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((item) => (
          <MenuItem key={item.name} onClick={item.func}>
            {item.icon} {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

export default UserOptions;
