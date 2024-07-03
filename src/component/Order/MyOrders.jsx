import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";

import { getUserDetails } from "../../actions/userAction";
const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, error, loading } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const orderlist = [];
  orders &&
    orders.map((order) => {
      const orderItems = order.orderItems;
      orderItems.map((orderItem) => {
        orderlist.push(orderItem);
        dispatch(getUserDetails(orderItem.product));
      });
    });
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch]);

  return (
    <Layout>
      {orders?.length === 0 ? (
        <div className="flex justify-center items-center w-full flex-col h-96">
          <Typography>You haven't bought anything yet.</Typography>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 rounded-sm text-white my-4 p-2"
          >
            View Products
          </button>
        </div>
      ) : (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <div className="my-8 min-[675px]:mx-[8vmax] mx-[2vmax]">
              <h6 className="text-3xl py-2">
                My Orders({orders && orders.length})
              </h6>
              <div className="flex gap-4">
                <div className="grow h-full">
                  {orderlist &&
                    orderlist.map((order, index) => (
                      <div
                        key={index}
                        className="flex min-[600px]:p-4 p-2 grow h-48 max-[600px]:h-56 flex justify-start items-center min-[600px]:gap-8 bg-white border border-[#DEE2E7]"
                      >
                        <div className="w-32 h-full pr-4">
                          <img
                            src={order.image}
                            alt={order.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p>{order.name}</p>
                          <p>Bought from :- {user.name}</p>
                          <div className="flex gap-2">
                            <Button variant="outlined" size="small">
                              Submit Review
                            </Button>
                            <Button variant="contained" size="small">
                              Buy again
                            </Button>
                          </div>
                          <div className="flex justify-start items-end gap-4 items-center">
                            <p className="border-2 border-[#DEE2E7] p-2 flex justify-center items-center rounded-md">
                              Quantity {order.quantity}
                            </p>
                            <p>
                              <i>
                                <CurrencyRupeeIcon />
                              </i>
                              {order.price * order.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Layout>
  );
};

export default MyOrders;
