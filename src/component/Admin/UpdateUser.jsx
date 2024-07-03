import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./SideBar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setPhone(user.phone);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("phone", phone);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Layout>
      <MetaData title="Update User" />
      <div className="flex justify-center items-center min-[1075px]:mx-[8vmax] mx-[2vmax]">
        <SideBar />
        <div className="w-96">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="bg-white p-4 rounded-md my-[5vmax] flex flex-col gap-2"
              onSubmit={updateUserSubmitHandler}
            >
              <h1 className="text-white bg-blue-600 p-2 text-xl text-center">
                Update User
              </h1>

              <div className="flex justify-start items-center gap-2">
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="outline-none w-full border-b border-gray-300"
                />
              </div>
              <div className="flex justify-start items-center gap-2">
                <MailOutlineIcon />
                <input
                  type="text"
                  placeholder="Phone"
                  required
                  value={phone}
                  onChange={(e) => setEmail(e.target.value)}
                  className="outline-none w-full border-b border-gray-300"
                />
              </div>
              <div className="flex justify-start items-center gap-2">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="outline-none w-full border-b border-gray-300"
                />
              </div>

              <div className="flex justify-start items-center gap-2">
                <VerifiedUserIcon />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="outline-none w-full border-b border-gray-300"
                >
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                </select>
              </div>

              <button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
                className="bg-blue-600 text-white p-2 my-2 rounded-sm"
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateUser;
