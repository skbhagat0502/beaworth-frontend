import { NavLink } from "react-router-dom";
import SideBar from "./SideBar";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import { getAllOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import { getAllUsers } from "../../actions/userAction";
import Layout from "../layout/Layout";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, orders } = useSelector((state) => state.allOrders);
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  let totalAmount = 0;
  orders &&
    orders.forEach((order) => {
      totalAmount += order.itemsPrice;
    });
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getAllOrders());
    dispatch(getProduct());
    dispatch(getAllUsers());
  }, [dispatch, error]);
  const recentOrders = orders ? orders.reverse().slice(0, 3) : [];
  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-start items-start w-full bg-white">
          <SideBar screenName="Dashboard" />
          <div className="grow-1 w-full h-full px-10 flex flex-wrap gap-10 mx-auto max-[500px]:justify-center pt-10">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-10 max-[500px]:justify-center max-[500px]:items-center">
                <div className="flex flex-wrap gap-8 w-full justify-start items-center">
                  <div className="w-80 max-[500px]:w-72 h-32 bg-[#52616B] rounded-2xl text-white flex flex-col justify-center items-start pl-6">
                    <span className="text-2xl font-semibold">Total Sales</span>
                    <span className="text-[3rem] font-light">
                      <span className="text-[1.5rem] mx-2">$</span>
                      {totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <NavLink
                    to="/admin/products"
                    className="w-80 max-[500px]:w-72 h-32 bg-[#52616B] rounded-2xl text-white flex flex-col justify-center items-start pl-6"
                  >
                    <span className="text-2xl font-semibold">
                      Total Products
                    </span>
                    <span className="text-[3rem] font-light">
                      {products && products.length}
                    </span>
                  </NavLink>
                  <NavLink
                    to="/admin/users"
                    className="w-80 max-[500px]:w-72 h-32 bg-[#52616B] rounded-2xl text-white flex flex-col justify-center items-start pl-6"
                  >
                    <span className="text-2xl font-semibold">Total Users</span>
                    <span className="text-[3rem] font-light">
                      {users && users.length}
                    </span>
                  </NavLink>
                  <NavLink
                    to="/admin/orders"
                    className="w-80 max-[500px]:w-72 h-32 bg-[#52616B] rounded-2xl text-white flex flex-col justify-center items-start pl-6"
                  >
                    <span className="text-2xl font-semibold">Total Orders</span>
                    <span className="text-[3rem] font-light">
                      {orders && orders.length}
                    </span>
                  </NavLink>
                </div>
                <div>
                  <div className="w-80 max-[500px]:w-72 h-96 bg-[#E3F6F5] rounded-xl p-8">
                    <p className="text-xl mb-4">Recent Order</p>
                    {recentOrders.reverse().map((order) => (
                      <div
                        key={order._id}
                        className="bg-white p-4 rounded-md shadow-md my-4 cursor-pointer"
                        onClick={() => navigate(`/admin/order/${order._id}`)}
                      >
                        <p className="text-sm font-semibold">#{order.user}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            timeZoneName: "short",
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default Dashboard;
