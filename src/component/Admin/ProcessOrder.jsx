import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import SideBar from "./SideBar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";

const ProcessOrder = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateOrder(params.id, myForm));
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, params.id, isUpdated, updateError]);

  const date = new Date(order?.createdAt);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return (
    <Layout>
      <MetaData title="Process Order" />
      <div className="flex min-[1075px]:mx-[8vmax] my-[2vmax]">
        <SideBar />
        <div>
          {loading ? (
            <Loader />
          ) : (
            <div
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div className="p-4 w-full bg-white rounded-md grid grid-cols-2 grid-rows-1 max-[675px]:grid-cols-1 max-[675px]:gap-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-start text-slate-800 text-2xl font-300 w-full bg-gray-300 p-2">
                        Order Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-gray-300 grid grid-cols-2 w-full grid-rows-1 p-2">
                      <td>
                        <p>Name</p>
                      </td>
                      <td>
                        <span>{order.user && order.user.name}</span>
                      </td>
                    </tr>
                    <tr className="border border-gray-300 grid grid-cols-2 w-full grid-rows-1 p-2">
                      <td>
                        <p>Phone</p>
                      </td>
                      <td>
                        <span>
                          {order.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                      </td>
                    </tr>
                    <tr className="border border-gray-300 grid grid-cols-2 w-full grid-rows-1 p-2">
                      <td>
                        <p>Address</p>
                      </td>
                      <td>
                        <span>
                          {order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}`}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-start text-slate-800 text-2xl font-300 w-full bg-gray-300 p-2">
                        Payment
                      </th>
                    </tr>
                  </thead>
                  <tbody className="orderDetailsContainerBox">
                    <tr className="border border-gray-300 grid grid-cols-2 w-full grid-rows-1 p-2">
                      <td>Payment</td>
                      <td
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </td>
                    </tr>
                    <tr className="border border-gray-300 grid grid-cols-2 w-full grid-rows-1 p-2">
                      <td>
                        <p>Amount</p>
                      </td>
                      <td>
                        <span>{order.totalPrice && order.totalPrice}</span>
                      </td>
                    </tr>
                    <tr className="border border-gray-300 grid grid-cols-2 w-full grid-rows-1 p-2">
                      <td>
                        <p>Date & Time</p>
                      </td>
                      <td>
                        <span>{formattedDate}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-start text-slate-800 text-2xl font-300 w-full bg-gray-300 p-2">
                        Order Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="orderDetailsContainerBox">
                    <tr className="border border-gray-300 grid grid-cols-2 w-full grid-rows-1 p-2">
                      <td>Order Status</td>
                      <td className="orderDetailsContainerBox">
                        <div>
                          <p
                            className={
                              order.orderStatus &&
                              order.orderStatus === "Delivered"
                                ? "greenColor"
                                : "redColor"
                            }
                          >
                            {order.orderStatus && order.orderStatus}
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-start text-slate-800 text-2xl font-300 w-full bg-gray-300 p-2">
                        Your Cart Items
                      </th>
                    </tr>
                  </thead>
                  <tbody className="confirmCartItemsContainer">
                    <tr className="border border-gray-300 grid grid-cols-2 w-full grid-rows-1 p-2">
                      <td>Your Cart Items</td>
                      <td className="confirmCartItemsContainer">
                        {order.orderItems &&
                          order.orderItems.map((item) => (
                            <div key={item.product}>
                              <img src={item.image} alt="Product" />
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>{" "}
                              <span>
                                {item.quantity} X ₹{item.price} ={" "}
                                <b>₹{item.price * item.quantity}</b>
                              </span>
                            </div>
                          ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  style={{
                    display:
                      order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                  className="min-[675px]:px-4"
                >
                  <form onSubmit={updateOrderSubmitHandler}>
                    <h1 className="p-2 bg-blue-600 text-white text-xl">
                      Process Order
                    </h1>

                    <div className="border-b w-full border-gray-300 flex justify-start items-center pt-4">
                      <AccountTreeIcon />
                      <select
                        onChange={(e) => setStatus(e.target.value)}
                        className="outline-none"
                      >
                        <option value="">Choose Category</option>
                        {order.orderStatus === "Successfull" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    <button
                      id="createProductBtn"
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                      className="bg-blue-600 px-4 py-2 my-4 text-white rounded-sm"
                    >
                      Process
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProcessOrder;
