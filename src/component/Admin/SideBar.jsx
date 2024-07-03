import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import profilePic from "../../assets/profile.png";
import { FaRegListAlt, FaUsers } from "react-icons/fa";
import { MdOutlineInventory2, MdLogout } from "react-icons/md";
import { clearErrors, logout } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoHomeOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BallotIcon from "@mui/icons-material/Ballot";
import RateReviewIcon from "@mui/icons-material/RateReview";

const SideBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, isAuthenticated } = useSelector((state) => state.user);

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors(error));
    }
  }, [error, isAuthenticated]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    navigate("/");
  };

  const sidebarClass = `z-30 max-[420px]:w-full min-w-72 h-full bg-white border-r-2 border-[#BAE8E8] flex flex-col justify-start items-start left-0 top-0 max-[776px]:fixed ${
    isSidebarOpen ? "visible" : "hidden"
  }`;

  return (
    <Fragment>
      <i
        className="absolute z-40 left-5 top-[1rem] text-3xl cursor-pointer"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu />
      </i>
      <div className={`${sidebarClass} max-[776px]:fixed pl-10`}>
        <div className="flex flex-col justify-center items-center ml-6 mt-[4vmax]">
          <div className="w-20 h-20 rounded-full border-4 border-blue-600 bg-white grid place-items-center mb-[1vmax]">
            <p className="text-blue-600 text-bold text-5xl">
              {user && user.name.substring(0, 1)}
            </p>
          </div>
          Hello {user?.name ? `${user?.name.split(" ")[0]}!` : "there!"}
        </div>
        <div className="flex flex-col justify-between items-start pt-5 mt-4 h-full py-[5rem]">
          <div>
            <button
              className="flex gap-2 items-center justify-center text-xl mb-4"
              onClick={() => {
                navigate("/admin/dashboard");
              }}
            >
              <i
                className={`${
                  props.screenName === "Dashboard"
                    ? "bg-gray-800"
                    : "bg-[#BAE8E8]"
                } p-2 rounded-md text-white text-[1rem]`}
              >
                <DashboardIcon />
              </i>
              Dashboard
            </button>
            <button
              className="flex gap-2 items-center justify-center text-xl mb-4"
              onClick={() => navigate("/admin/orders")}
            >
              <i
                className={`${
                  props.screenName === "Orders" ? "bg-gray-800" : "bg-[#BAE8E8]"
                } p-2 rounded-md text-white`}
              >
                <FaRegListAlt />
              </i>
              All Orders
            </button>
            <button
              className="flex gap-2 items-center justify-center text-xl mb-4"
              onClick={() => navigate("/admin/product")}
            >
              <i
                className={`${
                  props.screenName === "listProduct"
                    ? "bg-gray-800"
                    : "bg-[#BAE8E8]"
                } p-2 rounded-md text-white`}
              >
                <MdOutlineInventory2 />
              </i>
              List Products
            </button>
            <button
              className="flex gap-2 items-center justify-center text-xl mb-4"
              onClick={() => {
                navigate("/admin/products");
              }}
            >
              <i
                className={`${
                  props.screenName === "Products"
                    ? "bg-gray-800"
                    : "bg-[#BAE8E8]"
                } p-2 rounded-md text-white`}
              >
                <BallotIcon />
              </i>
              All Products
            </button>
            <button
              className="flex gap-2 items-center justify-center text-xl mb-4"
              onClick={() => {
                navigate("/admin/users");
              }}
            >
              <i
                className={`${
                  props.screenName === "Users" ? "bg-gray-800" : "bg-[#BAE8E8]"
                } p-2 rounded-md text-white`}
              >
                <FaUsers />
              </i>
              All Users
            </button>
            <button
              className="flex gap-2 items-center justify-center text-xl mb-4"
              onClick={() => {
                navigate("/admin/reviews");
              }}
            >
              <i
                className={`${
                  props.screenName === "Reviews"
                    ? "bg-gray-800"
                    : "bg-[#BAE8E8]"
                } p-2 rounded-md text-white`}
              >
                <RateReviewIcon />
              </i>
              All Reviews
            </button>
          </div>
          <div className="flex flex-col gap-4 justify-start items-start">
            <button
              className="flex gap-2 items-center justify-center text-xl"
              onClick={() => navigate("/")}
            >
              <i className="p-2 rounded-md bg-[#BAE8E8] text-white">
                <IoHomeOutline />
              </i>
              Go Home
            </button>
            <button
              className="flex gap-2 items-center justify-center text-xl"
              onClick={handleLogout}
            >
              <i className="p-2 rounded-md bg-[#BAE8E8] text-white">
                <MdLogout />
              </i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SideBar;
