import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="p-4 min-[1076px]:mx-[8vmax]">
            <div>
              <h1 className="text-black text-2xl my-2">My Profile</h1>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border">
                <tbody>
                  <tr className="border-b flex flex-wrap justify-between">
                    <td className="py-2 px-4">
                      <h4 className="font-semibold">Full Name</h4>
                    </td>
                    <td className="py-2 px-4">{user.name}</td>
                  </tr>
                  <tr className="border-b flex flex-wrap justify-between">
                    <td className="py-2 px-4">
                      <h4 className="font-semibold">Phone</h4>
                    </td>
                    <td className="py-2 px-4">{user.phone}</td>
                  </tr>
                  <tr className="border-b flex flex-wrap justify-between">
                    <td className="py-2 px-4">
                      <h4 className="font-semibold">Email</h4>
                    </td>
                    <td className="py-2 px-4">{user.email}</td>
                  </tr>
                  <tr className="border-b flex flex-wrap justify-between">
                    <td className="py-2 px-4">
                      <h4 className="font-semibold">Joined On</h4>
                    </td>
                    <td className="py-2 px-4">
                      {String(user.createdAt).substr(0, 10)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <Link
                to="/orders"
                className="bg-blue-700 p-2 rounded-sm text-white text-center"
              >
                My Orders
              </Link>
              <Link
                to="/password/update"
                className="bg-blue-700 p-2 rounded-sm text-white text-center"
              >
                Change Password
              </Link>
            </div>
          </div>
        </Layout>
      )}
    </Fragment>
  );
};

export default Profile;
